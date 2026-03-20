import { createOrdersRepository } from '@orders/shared';
import { createReactNativeHttpClient } from '../adapters/reactNativeHttpClient';
import { apiBaseUrl } from '../platform-rn/apiBaseUrl';

export const ordersRepository = createOrdersRepository(
  createReactNativeHttpClient(apiBaseUrl)
);
