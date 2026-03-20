import type { HttpClient } from '../../contracts/http-client';
import type { OrderDetails, OrderSummary } from '../../domain/orders/types';

export type OrdersApi = {
  getOrders: () => Promise<OrderSummary[]>;
  getOrderDetails: (orderId: string) => Promise<OrderDetails>;
  cancelOrder: (orderId: string) => Promise<OrderDetails>;
};

export const createOrdersApi = (
  httpClient: HttpClient,
  basePath = ''
): OrdersApi => {
  const normalizePath = (path: string) => `${basePath}${path}`;

  return {
    getOrders: () => httpClient.get<OrderSummary[]>(normalizePath('/orders')),
    getOrderDetails: (orderId: string) =>
      httpClient.get<OrderDetails>(normalizePath(`/orders/${orderId}`)),
    cancelOrder: (orderId: string) =>
      httpClient.post<OrderDetails>(normalizePath(`/orders/${orderId}/cancel`))
  };
};
