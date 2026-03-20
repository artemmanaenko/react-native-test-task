import { Navigate, createBrowserRouter } from 'react-router-dom';
import { OrdersListPage } from '../pages/OrdersListPage';
import { OrderDetailsPage } from '../pages/OrderDetailsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/orders" replace />
  },
  {
    path: '/orders',
    element: <OrdersListPage />
  },
  {
    path: '/orders/:id',
    element: <OrderDetailsPage />
  }
]);
