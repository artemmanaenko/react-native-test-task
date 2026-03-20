import { useQuery } from '@tanstack/react-query';
import { filterOrdersByStatus } from '../../domain/orders/useCases';
import type { OrderStatus } from '../../domain/orders/types';
import type { OrdersRepository } from '../../data/orders/orders.repository';
import { ordersQueryKeys } from './queryKeys';

export type UseOrdersQueryParams = {
  repository: OrdersRepository;
  status?: OrderStatus | 'all';
};

export const useOrdersQuery = ({
  repository,
  status = 'all'
}: UseOrdersQueryParams) =>
  useQuery({
    queryKey: ordersQueryKeys.list(status),
    queryFn: () => repository.getOrders(),
    select: (orders) => filterOrdersByStatus(orders, status)
  });
