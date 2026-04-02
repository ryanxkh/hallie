import type { Order } from "./types";

export function getRelativeDate(daysOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split("T")[0];
}

export function getOrders(): Order[] {
  return [
    {
      orderId: "HS-10421",
      customerId: "CUST-001",
      items: [
        {
          name: "Canon AE-1 Program (Silver)",
          category: "camera",
          quantity: 1,
          price: 289.0,
          isSaleItem: false,
        },
        {
          name: "Kodak Portra 400 3-Pack",
          category: "film",
          quantity: 1,
          price: 38.97,
          isSaleItem: false,
        },
      ],
      subtotal: 327.97,
      shipping: 0.0,
      total: 327.97,
      status: "shipped",
      orderDate: getRelativeDate(-4),
      shippedDate: getRelativeDate(-2),
      deliveredDate: null,
      tracking: "9400111899223100567842",
      shippingMethod: "USPS Priority (3-5 business days)",
    },
    {
      orderId: "HS-10422",
      customerId: "CUST-002",
      items: [
        {
          name: "Nikon FM2 (Black)",
          category: "camera",
          quantity: 1,
          price: 349.0,
          isSaleItem: false,
        },
        {
          name: "Camera Strap (Cognac Leather)",
          category: "accessory",
          quantity: 1,
          price: 42.0,
          isSaleItem: false,
        },
      ],
      subtotal: 391.0,
      shipping: 0.0,
      total: 391.0,
      status: "processing",
      orderDate: getRelativeDate(-1),
      shippedDate: null,
      deliveredDate: null,
      tracking: null,
      shippingMethod: "USPS Priority (3-5 business days)",
    },
    {
      orderId: "HS-10423",
      customerId: "CUST-003",
      items: [
        {
          name: "Film Lab Membership",
          category: "membership",
          quantity: 1,
          price: 18.0,
          isSaleItem: false,
        },
      ],
      subtotal: 18.0,
      shipping: 0.0,
      total: 18.0,
      status: "delivered",
      orderDate: getRelativeDate(-30),
      shippedDate: null,
      deliveredDate: null,
      tracking: null,
      shippingMethod: "N/A",
    },
    {
      orderId: "HS-10424",
      customerId: "CUST-001",
      items: [
        {
          name: "Olympus Stylus Epic (Champagne)",
          category: "camera",
          quantity: 1,
          price: 279.0,
          isSaleItem: false,
        },
      ],
      subtotal: 279.0,
      shipping: 0.0,
      total: 279.0,
      status: "delivered",
      orderDate: getRelativeDate(-16),
      shippedDate: getRelativeDate(-14),
      deliveredDate: getRelativeDate(-11),
      tracking: "9400111899223100567843",
      shippingMethod: "USPS Priority (3-5 business days)",
    },
    {
      orderId: "HS-10425",
      customerId: "CUST-004",
      items: [
        {
          name: "CLA Service — Hasselblad 500C/M",
          category: "service",
          quantity: 1,
          price: 55.0,
          isSaleItem: false,
        },
      ],
      subtotal: 55.0,
      shipping: 0.0,
      total: 55.0,
      status: "processing",
      orderDate: getRelativeDate(-10),
      shippedDate: null,
      deliveredDate: null,
      tracking: null,
      shippingMethod: "N/A",
    },
    {
      orderId: "HS-10426",
      customerId: "CUST-001",
      items: [
        {
          name: "Kodak Tri-X 400 5-Pack",
          category: "film",
          quantity: 1,
          price: 59.95,
          isSaleItem: false,
        },
        {
          name: "Ilford HP5 Plus 400 3-Pack",
          category: "film",
          quantity: 1,
          price: 33.97,
          isSaleItem: false,
        },
      ],
      subtotal: 93.92,
      shipping: 7.95,
      total: 101.87,
      status: "delivered",
      orderDate: getRelativeDate(-53),
      shippedDate: getRelativeDate(-51),
      deliveredDate: getRelativeDate(-49),
      tracking: "9400111899223100567844",
      shippingMethod: "USPS Priority (3-5 business days)",
    },
  ];
}

export function getOrderById(orderId: string): Order | undefined {
  return getOrders().find((o) => o.orderId === orderId);
}

export function getOrdersByCustomerId(customerId: string): Order[] {
  return getOrders().filter((o) => o.customerId === customerId);
}
