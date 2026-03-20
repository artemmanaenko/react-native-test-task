import { create } from 'zustand';
import type { OrderStatus } from '@orders/shared';
import { appStorage } from '../platform-rn/storage/storage';

const FILTER_KEY = 'orders.filter.status';

const readInitialStatus = (): OrderStatus | 'all' => {
  const value = appStorage.getString(FILTER_KEY);

  if (
    value === 'all' ||
    value === 'new' ||
    value === 'processing' ||
    value === 'shipped' ||
    value === 'delivered' ||
    value === 'cancelled'
  ) {
    return value;
  }

  return 'all';
};

type OrdersFilterState = {
  status: OrderStatus | 'all';
  setStatus: (status: OrderStatus | 'all') => void;
};

export const useOrdersFilterStore = create<OrdersFilterState>((set) => ({
  status: readInitialStatus(),
  setStatus: (status) => {
    appStorage.setString(FILTER_KEY, status);
    set({ status });
  }
}));
