import { tool } from "ai";
import { z } from "zod";
import {
  getOrdersByCustomerId,
  getOrderById,
  getRelativeDate,
} from "@/data/orders";
import { getMembershipByCustomerId } from "@/data/memberships";
import { searchProducts } from "@/data/products";
import type { ItemCategory } from "@/data/types";

const RETURN_WINDOWS: Partial<Record<ItemCategory, number>> = {
  camera: 14,
  film: 30,
  accessory: 30,
};

export const halideTools = {
  getOrders: tool({
    description:
      "Retrieve all orders for a customer. Use when the customer asks about their orders without specifying an order number.",
    parameters: z.object({
      customerId: z.string().describe("The customer's unique ID"),
    }),
    execute: async ({ customerId }) => {
      const orders = getOrdersByCustomerId(customerId);
      return {
        orders: orders.map((o) => ({
          orderId: o.orderId,
          items: o.items.map((i) => ({ name: i.name, quantity: i.quantity })),
          status: o.status,
          orderDate: o.orderDate,
          deliveredDate: o.deliveredDate,
          tracking: o.tracking,
        })),
      };
    },
  }),

  getOrderDetails: tool({
    description:
      "Retrieve full details for a specific order by order ID. Use when the customer has provided or confirmed a specific order number.",
    parameters: z.object({
      orderId: z.string().describe("The order ID (e.g., HS-10421)"),
    }),
    execute: async ({ orderId }) => {
      const order = getOrderById(orderId);
      if (!order) {
        return { error: `No order found with ID ${orderId}` };
      }
      return { order };
    },
  }),

  checkReturnEligibility: tool({
    description:
      "Check if an order is eligible for return. Computes date math server-side. Use before initiating any return.",
    parameters: z.object({
      orderId: z
        .string()
        .describe("The order ID to check return eligibility for"),
    }),
    execute: async ({ orderId }) => {
      const order = getOrderById(orderId);
      if (!order) {
        return { error: `No order found with ID ${orderId}` };
      }
      if (!order.deliveredDate) {
        return {
          eligible: false,
          reason: "Order has not been delivered yet.",
          items: [] as Array<{
            name: string;
            category: string;
            eligible: boolean;
            reason: string;
            daysRemaining: number | null;
            daysOverdue: number | null;
          }>,
        };
      }

      const today = new Date(getRelativeDate(0));
      const delivered = new Date(order.deliveredDate);

      const items = order.items.map((item) => {
        if (item.isSaleItem) {
          return {
            name: item.name,
            category: item.category,
            eligible: false,
            reason: "Sale items are final sale, no returns.",
            daysRemaining: null as number | null,
            daysOverdue: null as number | null,
          };
        }

        const windowDays = RETURN_WINDOWS[item.category];
        if (!windowDays) {
          return {
            name: item.name,
            category: item.category,
            eligible: false,
            reason: `Returns are not available for ${item.category} items.`,
            daysRemaining: null as number | null,
            daysOverdue: null as number | null,
          };
        }

        const deadline = new Date(delivered);
        deadline.setDate(deadline.getDate() + windowDays);
        const diffMs = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
          return {
            name: item.name,
            category: item.category,
            eligible: true,
            reason: `Within the ${windowDays}-day return window. ${diffDays} day(s) remaining.`,
            daysRemaining: diffDays,
            daysOverdue: null as number | null,
          };
        } else {
          return {
            name: item.name,
            category: item.category,
            eligible: false,
            reason: `The ${windowDays}-day return window has closed. ${Math.abs(diffDays)} day(s) overdue.`,
            daysRemaining: null as number | null,
            daysOverdue: Math.abs(diffDays),
          };
        }
      });

      return { orderId, deliveredDate: order.deliveredDate, items };
    },
  }),

  initiateReturn: tool({
    description:
      "Start the return process for an eligible order. Only use after checkReturnEligibility confirms the item is eligible and the customer has confirmed they want to proceed.",
    parameters: z.object({
      orderId: z.string().describe("The order ID to return"),
      reason: z.string().describe("The customer's reason for returning"),
    }),
    execute: async ({ orderId, reason }) => {
      const order = getOrderById(orderId);
      if (!order) {
        return { success: false, message: `No order found with ID ${orderId}` };
      }

      if (!order.deliveredDate) {
        return { success: false, message: "Order has not been delivered yet." };
      }

      const today = new Date(getRelativeDate(0));
      const delivered = new Date(order.deliveredDate);
      const hasEligibleItem = order.items.some((item) => {
        const windowDays = RETURN_WINDOWS[item.category];
        if (!windowDays || item.isSaleItem) return false;
        const deadline = new Date(delivered);
        deadline.setDate(deadline.getDate() + windowDays);
        return today <= deadline;
      });

      if (!hasEligibleItem) {
        return {
          success: false,
          message: "No eligible items for return in this order.",
        };
      }

      return {
        success: true,
        returnId: `RET-${Date.now()}`,
        message: "Return initiated successfully.",
        reason,
        instructions: {
          returnLabel:
            "A prepaid return label will be emailed to you within 1 business day.",
          shipBy: getRelativeDate(7),
          refundMethod: "Original payment method",
          refundTimeline: "Within 7 business days of receiving the return",
          conditions: [
            "Camera must be in original condition with all included accessories.",
            "Original shipping charges are non-refundable.",
          ],
        },
      };
    },
  }),

  getMembership: tool({
    description:
      "Retrieve membership details for a customer. Use before making any membership changes.",
    parameters: z.object({
      customerId: z.string().describe("The customer's unique ID"),
    }),
    execute: async ({ customerId }) => {
      const membership = getMembershipByCustomerId(customerId);
      if (!membership) {
        return { hasMembership: false, message: "No active membership found." };
      }
      return { hasMembership: true, membership };
    },
  }),

  updateMembership: tool({
    description:
      "Pause or cancel a customer's membership. Use only after looking up the current membership state with getMembership.",
    parameters: z.object({
      customerId: z.string().describe("The customer's unique ID"),
      action: z
        .enum(["pause", "cancel"])
        .describe("Whether to pause or cancel the membership"),
    }),
    execute: async ({ customerId, action }) => {
      const membership = getMembershipByCustomerId(customerId);
      if (!membership) {
        return { success: false, message: "No active membership found." };
      }

      if (action === "pause") {
        if (membership.status === "paused") {
          return { success: false, message: "Membership is already paused." };
        }
        return {
          success: true,
          action: "paused" as const,
          message: "Membership has been paused.",
          details: {
            creditsFrozen: membership.credits,
            billingPaused: true,
            resumeDate: getRelativeDate(60),
            note: "Your credits are frozen and billing is paused. Membership will resume automatically in 2 months.",
          },
        };
      }

      return {
        success: true,
        action: "cancelled" as const,
        message: "Membership has been cancelled.",
        details: {
          unusedCredits: membership.credits,
          creditsExpireDate: getRelativeDate(60),
          note: `You have ${membership.credits} unused credit(s). They'll remain available for 60 days.`,
        },
      };
    },
  }),

  checkProductAvailability: tool({
    description:
      "Search the product catalog by name or keyword. Use when a customer asks about a specific product or wants recommendations.",
    parameters: z.object({
      query: z.string().describe("Product name or keyword to search for"),
    }),
    execute: async ({ query }) => {
      const results = searchProducts(query);
      if (results.length === 0) {
        return {
          found: false,
          message: `No products found matching "${query}".`,
        };
      }
      return {
        found: true,
        products: results.map((p) => ({
          name: p.name,
          category: p.category,
          price: p.price,
          stockStatus: p.stockStatus,
          description: p.description,
        })),
      };
    },
  }),

  escalateToHuman: tool({
    description:
      "Hand off the conversation to a human team member. Use when the customer's request is beyond your authority, the customer is frustrated after two attempts to resolve, or they explicitly ask for a person.",
    parameters: z.object({
      reason: z.string().describe("Why the conversation is being escalated"),
      conversationSummary: z
        .string()
        .describe(
          "Summary of what was discussed and what actions were already taken"
        ),
      priority: z
        .enum(["standard", "urgent"])
        .describe(
          "standard: customer needs follow-up but no immediate time pressure. urgent: customer has a time-sensitive situation (event, deadline, travel) or is significantly frustrated."
        ),
    }),
    execute: async ({ reason, conversationSummary, priority }) => {
      return {
        success: true,
        escalationId: `ESC-${Date.now()}`,
        priority,
        message:
          priority === "urgent"
            ? "I'm connecting you with a team member right now. They'll have the full context of our conversation."
            : "I'm connecting you with a team member who can help with this. They'll have the full context of our conversation so you won't need to repeat anything.",
        contextPackage: {
          reason,
          conversationSummary,
          priority,
          timestamp: new Date().toISOString(),
        },
      };
    },
  }),
};
