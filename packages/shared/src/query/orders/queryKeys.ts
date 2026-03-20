export const ordersQueryKeys = {
  all: ['orders'] as const,
  list: (status: string | 'all') => [...ordersQueryKeys.all, 'list', status] as const,
  details: (orderId: string) => [...ordersQueryKeys.all, 'details', orderId] as const
};
