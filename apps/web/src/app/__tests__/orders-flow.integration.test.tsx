import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MemoryRouter,
  Route,
  Routes
} from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ordersRepository } from '../ordersRepository';
import { OrderDetailsPage } from '../../pages/OrderDetailsPage';
import { OrdersListPage } from '../../pages/OrdersListPage';
import { createTestQueryClient } from '../../test/testUtils';

vi.mock('../ordersRepository', () => ({
  ordersRepository: {
    getOrders: vi.fn(),
    getOrderDetails: vi.fn(),
    cancelOrder: vi.fn()
  }
}));

const getOrdersMock = vi.mocked(ordersRepository.getOrders);
const getOrderDetailsMock = vi.mocked(ordersRepository.getOrderDetails);

const ordersFixture = [
  {
    id: '1',
    number: 'ORD-1001',
    status: 'new' as const,
    customerName: 'Customer 1',
    totalAmount: 120,
    currency: 'USD',
    createdAt: '2026-02-01T10:00:00.000Z',
    itemsCount: 2
  }
];

const detailsFixture = {
  id: '1',
  number: 'ORD-1001',
  status: 'new' as const,
  customerName: 'Customer 1',
  totalAmount: 120,
  currency: 'USD',
  createdAt: '2026-02-01T10:00:00.000Z',
  itemsCount: 2,
  shippingAddress: '10 Main Street',
  items: [{ id: 'i-1', title: 'Item A', quantity: 1, price: 120 }],
  canBeCancelled: true
};

describe('orders flow integration', () => {
  beforeEach(() => {
    getOrdersMock.mockReset();
    getOrderDetailsMock.mockReset();
  });

  it('navigates from orders list to order details', async () => {
    const user = userEvent.setup();
    getOrdersMock.mockResolvedValue(ordersFixture);
    getOrderDetailsMock.mockResolvedValue(detailsFixture);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter
          initialEntries={['/orders']}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route path="/orders" element={<OrdersListPage />} />
            <Route path="/orders/:id" element={<OrderDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText('ORD-1001')).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Open details' }));

    expect(await screen.findByText('Customer: Customer 1')).toBeInTheDocument();
    expect(getOrderDetailsMock).toHaveBeenCalledWith('1');
  });
});
