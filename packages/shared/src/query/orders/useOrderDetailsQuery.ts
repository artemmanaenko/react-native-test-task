import { useQuery } from '@tanstack/react-query';
import type { OrdersRepository } from '../../data/orders/orders.repository';
import { ordersQueryKeys } from './queryKeys';

export type UseOrderDetailsQueryParams = {
  repository: OrdersRepository;
  orderId: string;
};

export const useOrderDetailsQuery = ({
  repository,
  orderId
}: UseOrderDetailsQueryParams) =>
  useQuery({
    queryKey: ordersQueryKeys.details(orderId),
    queryFn: () => repository.getOrderDetails(orderId),
    enabled: Boolean(orderId)
  });
