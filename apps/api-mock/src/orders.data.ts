export type OrderStatus =
  | 'new'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type OrderSummaryDto = {
  id: string;
  number: string;
  status: OrderStatus;
  customerName: string;
  totalAmount: number;
  currency: string;
  createdAt: string;
  itemsCount: number;
};

export type OrderDetailsDto = OrderSummaryDto & {
  shippingAddress: string;
  notes?: string;
  items: Array<{ id: string; title: string; quantity: number; price: number }>;
  canBeCancelled: boolean;
};

const STATUSES: OrderStatus[] = [
  'new',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
];

const baseDate = new Date('2026-02-01T10:00:00.000Z');

export const canCancelOrderStatus = (status: OrderStatus): boolean =>
  status === 'new' || status === 'processing';

export const createInitialOrders = (): OrderDetailsDto[] => {
  return Array.from({ length: 10 }).map((_, index) => {
    const id = `${index + 1}`;
    const status = STATUSES[index % STATUSES.length];
    const items = [
      {
        id: `${id}-1`,
        title: `Item ${index + 1}A`,
        quantity: 1 + (index % 3),
        price: 20 + index * 4
      },
      {
        id: `${id}-2`,
        title: `Item ${index + 1}B`,
        quantity: 1,
        price: 15 + index * 3
      }
    ];

    return {
      id,
      number: `ORD-${String(index + 1001)}`,
      status,
      customerName: `Customer ${index + 1}`,
      totalAmount: items.reduce((total, item) => total + item.price * item.quantity, 0),
      currency: 'USD',
      createdAt: new Date(baseDate.getTime() - index * 1000 * 60 * 60 * 12).toISOString(),
      itemsCount: items.reduce((count, item) => count + item.quantity, 0),
      shippingAddress: `${10 + index} Market Street, Springfield`,
      notes: index % 2 === 0 ? 'Leave package at the front door.' : undefined,
      items,
      canBeCancelled: canCancelOrderStatus(status)
    };
  });
};

export const toOrderSummary = ({
  items,
  notes,
  shippingAddress,
  canBeCancelled,
  ...summary
}: OrderDetailsDto): OrderSummaryDto => summary;
