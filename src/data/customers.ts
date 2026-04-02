import type { Customer } from "./types";

export const customers: Customer[] = [
  {
    customerId: "CUST-001",
    name: "Ryan Hodge",
    email: "rkhodge@gmail.com",
    membershipId: "MEM-001",
  },
  {
    customerId: "CUST-002",
    name: "Marcus Rivera",
    email: "marcus.rivera@email.com",
    membershipId: null,
  },
  {
    customerId: "CUST-003",
    name: "Jamie Okafor",
    email: "jamie.okafor@email.com",
    membershipId: "MEM-002",
  },
  {
    customerId: "CUST-004",
    name: "Alex Park",
    email: "alex.park@email.com",
    membershipId: null,
  },
];

export function getCustomerById(customerId: string): Customer | undefined {
  return customers.find((c) => c.customerId === customerId);
}

export function getCustomerByEmail(email: string): Customer | undefined {
  return customers.find((c) => c.email === email);
}
