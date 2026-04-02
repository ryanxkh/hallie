// Halide Supply Co. — Shared Types

// ─── Customers ───────────────────────────────────────────────

export interface Customer {
  customerId: string;
  name: string;
  email: string;
  membershipId: string | null;
}

// ─── Orders ──────────────────────────────────────────────────

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export type ItemCategory = "camera" | "film" | "accessory" | "service" | "membership";

export interface OrderItem {
  name: string;
  category: ItemCategory;
  quantity: number;
  price: number;
  isSaleItem: boolean;
}

export interface Order {
  orderId: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  orderDate: string;
  shippedDate: string | null;
  deliveredDate: string | null;
  tracking: string | null;
  shippingMethod: string;
}

// ─── Products ────────────────────────────────────────────────

export type ProductCategory =
  | "35mm_slr"
  | "35mm_point_and_shoot"
  | "medium_format"
  | "instant"
  | "super_8"
  | "film_35mm"
  | "film_120"
  | "film_instant"
  | "film_super_8"
  | "film_expired"
  | "accessory";

export type StockStatus = "in_stock" | "out_of_stock" | "low_stock";

export interface Product {
  productId: string;
  name: string;
  category: ProductCategory;
  price: number;
  stockStatus: StockStatus;
  description: string;
}

// ─── Memberships ─────────────────────────────────────────────

export type MembershipPlan = "film_lab" | "the_vault";

export type MembershipStatus = "active" | "paused" | "cancelled";

export interface PauseDetails {
  pausedDate: string;
  resumeDate: string;
}

export interface Membership {
  membershipId: string;
  customerId: string;
  plan: MembershipPlan;
  planName: string;
  status: MembershipStatus;
  monthlyPrice: number;
  startDate: string;
  credits: number;
  maxCredits: number;
  billingDate: string;
  pauseDetails: PauseDetails | null;
}
