import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { OrdersRepository } from '../../data/orders/orders.repository';
import { ordersQueryKeys } from './queryKeys';

export type UseCancelOrderMutationParams = {
  repository: OrdersRepository;
  orderId: string;
};

export const useCancelOrderMutation = ({
  repository,
  orderId
}: UseCancelOrderMutationParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => repository.cancelOrder(orderId),
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(ordersQueryKeys.details(orderId), updatedOrder);
      queryClient.invalidateQueries({ queryKey: ordersQueryKeys.all });
    }
  });
};
