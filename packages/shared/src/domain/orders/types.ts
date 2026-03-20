export type OrderStatus =
  | 'new'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type OrderSummary = {
  id: string;
  number: string;
  status: OrderStatus;
  customerName: string;
  totalAmount: number;
  currency: string;
  createdAt: string;
  itemsCount: number;
};

export type OrderItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
};

export type OrderDetails = OrderSummary & {
  shippingAddress: string;
  notes?: string;
  items: OrderItem[];
  canBeCancelled: boolean;
};
