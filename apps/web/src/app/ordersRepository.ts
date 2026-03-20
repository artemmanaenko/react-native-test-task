import { createOrdersRepository } from '@orders/shared';
import { createFetchHttpClient } from '../adapters/fetchHttpClient';

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export const ordersRepository = createOrdersRepository(
  createFetchHttpClient(apiBaseUrl)
);
