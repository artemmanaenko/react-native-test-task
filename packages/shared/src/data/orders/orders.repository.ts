import { createOrdersApi } from './orders.api';
import type { HttpClient } from '../../contracts/http-client';
import type { OrderDetails, OrderSummary } from '../../domain/orders/types';

export type OrdersRepository = {
  getOrders: () => Promise<OrderSummary[]>;
  getOrderDetails: (orderId: string) => Promise<OrderDetails>;
  cancelOrder: (orderId: string) => Promise<OrderDetails>;
};

const mapOrderSummary = (order: OrderSummary): OrderSummary => ({
  ...order,
  customerName: order.customerName.trim(),
  currency: order.currency.toUpperCase()
});

const mapOrderDetails = (order: OrderDetails): OrderDetails => ({
  ...mapOrderSummary(order),
  shippingAddress: order.shippingAddress.trim(),
  notes: order.notes?.trim(),
  canBeCancelled: order.canBeCancelled,
  items: order.items.map((item) => ({
    ...item,
    title: item.title.trim()
  }))
});

export const createOrdersRepository = (
  httpClient: HttpClient,
  basePath = ''
): OrdersRepository => {
  const api = createOrdersApi(httpClient, basePath);

  return {
    async getOrders() {
      const orders = await api.getOrders();
      return orders.map(mapOrderSummary);
    },
    async getOrderDetails(orderId: string) {
      const order = await api.getOrderDetails(orderId);
      return mapOrderDetails(order);
    },
    async cancelOrder(orderId: string) {
      const order = await api.cancelOrder(orderId);
      return mapOrderDetails(order);
    }
  };
};
