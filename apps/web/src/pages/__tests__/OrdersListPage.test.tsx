import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, beforeEach, expect, it, vi } from 'vitest';
import { OrdersListPage } from '../OrdersListPage';
import { ordersRepository } from '../../app/ordersRepository';
import { renderPage } from '../../test/testUtils';

vi.mock('../../app/ordersRepository', () => ({
  ordersRepository: {
    getOrders: vi.fn(),
    getOrderDetails: vi.fn(),
    cancelOrder: vi.fn()
  }
}));

const getOrdersMock = vi.mocked(ordersRepository.getOrders);

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
  },
  {
    id: '2',
    number: 'ORD-1002',
    status: 'delivered' as const,
    customerName: 'Customer 2',
    totalAmount: 80,
    currency: 'USD',
    createdAt: '2026-02-02T10:00:00.000Z',
    itemsCount: 1
  }
];

describe('OrdersListPage', () => {
  beforeEach(() => {
    getOrdersMock.mockReset();
  });

  it('shows loading and then renders orders', async () => {
    getOrdersMock.mockResolvedValue(ordersFixture);

    renderPage(<OrdersListPage />, { route: '/orders', path: '/orders' });

    expect(screen.getByText('Loading orders...')).toBeInTheDocument();
    expect(await screen.findByText('ORD-1001')).toBeInTheDocument();
    expect(screen.getByText('ORD-1002')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Open details' })[0]).toHaveAttribute(
      'href',
      '/orders/1'
    );
  });

  it('filters orders by status', async () => {
    const user = userEvent.setup();
    getOrdersMock.mockResolvedValue(ordersFixture);

    renderPage(<OrdersListPage />, { route: '/orders', path: '/orders' });

    await screen.findByText('ORD-1001');
    await user.selectOptions(screen.getByLabelText('Status'), 'delivered');

    await waitFor(() => {
      expect(screen.queryByText('ORD-1001')).not.toBeInTheDocument();
    });
    expect(screen.getByText('ORD-1002')).toBeInTheDocument();
  });

  it('shows empty state', async () => {
    getOrdersMock.mockResolvedValue([]);

    renderPage(<OrdersListPage />, { route: '/orders', path: '/orders' });

    expect(await screen.findByText('No orders found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('shows error state and retries request', async () => {
    const user = userEvent.setup();
    getOrdersMock.mockRejectedValue(new Error('network failure'));

    renderPage(<OrdersListPage />, { route: '/orders', path: '/orders' });

    expect(await screen.findByText('Could not load orders')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Retry' }));

    await waitFor(() => {
      expect(getOrdersMock).toHaveBeenCalledTimes(2);
    });
  });
});
