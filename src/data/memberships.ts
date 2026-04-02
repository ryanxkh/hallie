import type { Membership } from "./types";
import { getRelativeDate } from "./orders";

export function getMemberships(): Membership[] {
  return [
    {
      membershipId: "MEM-001",
      customerId: "CUST-001",
      plan: "film_lab",
      planName: "Film Lab Membership",
      status: "active",
      monthlyPrice: 18.0,
      startDate: getRelativeDate(-90),
      credits: 2,
      maxCredits: 24,
      billingDate: getRelativeDate(5),
      pauseDetails: null,
    },
    {
      membershipId: "MEM-002",
      customerId: "CUST-003",
      plan: "film_lab",
      planName: "Film Lab Membership",
      status: "active",
      monthlyPrice: 18.0,
      startDate: getRelativeDate(-30),
      credits: 1,
      maxCredits: 24,
      billingDate: getRelativeDate(0),
      pauseDetails: null,
    },
  ];
}

export function getMembershipByCustomerId(
  customerId: string
): Membership | undefined {
  return getMemberships().find((m) => m.customerId === customerId);
}

export function getMembershipById(
  membershipId: string
): Membership | undefined {
  return getMemberships().find((m) => m.membershipId === membershipId);
}
