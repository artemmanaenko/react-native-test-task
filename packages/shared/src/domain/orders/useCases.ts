import type { OrderStatus, OrderSummary } from './types';

export const filterOrdersByStatus = (
  orders: OrderSummary[],
  status: OrderStatus | 'all'
): OrderSummary[] => {
  if (status === 'all') {
    return orders;
  }

  return orders.filter((order) => order.status === status);
};
