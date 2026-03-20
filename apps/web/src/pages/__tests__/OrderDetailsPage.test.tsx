import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OrderDetailsPage } from '../OrderDetailsPage';
import { ordersRepository } from '../../app/ordersRepository';
import { renderPage } from '../../test/testUtils';

vi.mock('../../app/ordersRepository', () => ({
  ordersRepository: {
    getOrders: vi.fn(),
    getOrderDetails: vi.fn(),
    cancelOrder: vi.fn()
  }
}));

const getOrderDetailsMock = vi.mocked(ordersRepository.getOrderDetails);
const cancelOrderMock = vi.mocked(ordersRepository.cancelOrder);

const detailsFixture = {
  id: '1',
  number: 'ORD-1001',
  status: 'processing' as const,
  customerName: 'Customer 1',
  totalAmount: 149,
  currency: 'USD',
  createdAt: '2026-02-01T10:00:00.000Z',
  itemsCount: 3,
  shippingAddress: '10 Main Street',
  notes: 'Leave at the door',
  items: [
    { id: 'i-1', title: 'Item A', quantity: 2, price: 20 },
    { id: 'i-2', title: 'Item B', quantity: 1, price: 30 }
  ],
  canBeCancelled: true
};

describe('OrderDetailsPage', () => {
  beforeEach(() => {
    getOrderDetailsMock.mockReset();
    cancelOrderMock.mockReset();
  });

  it('shows loading and then renders order details', async () => {
    getOrderDetailsMock.mockResolvedValue(detailsFixture);

    renderPage(<OrderDetailsPage />, {
      route: '/orders/1',
      path: '/orders/:id'
    });

    expect(screen.getByText('Loading order details...')).toBeInTheDocument();
    expect(await screen.findByText('ORD-1001')).toBeInTheDocument();
    expect(screen.getByText('Customer: Customer 1')).toBeInTheDocument();
    expect(screen.getByText('Address: 10 Main Street')).toBeInTheDocument();
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to list' })).toHaveAttribute(
      'href',
      '/orders'
    );
  });

  it('shows not found state when payload is empty', async () => {
    getOrderDetailsMock.mockResolvedValue(null as never);

    renderPage(<OrderDetailsPage />, {
      route: '/orders/404',
      path: '/orders/:id'
    });

    expect(await screen.findByText('Order not found')).toBeInTheDocument();
  });

  it('shows error state and retries request', async () => {
    const user = userEvent.setup();
    getOrderDetailsMock.mockRejectedValue(new Error('details failed'));

    renderPage(<OrderDetailsPage />, {
      route: '/orders/1',
      path: '/orders/:id'
    });

    expect(await screen.findByText('Could not load order details')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Retry' }));

    await waitFor(() => {
      expect(getOrderDetailsMock).toHaveBeenCalledTimes(2);
    });
  });

  it('cancels order when cancel button is clicked', async () => {
    const user = userEvent.setup();
    getOrderDetailsMock.mockResolvedValue(detailsFixture);
    cancelOrderMock.mockResolvedValue({
      ...detailsFixture,
      status: 'cancelled',
      canBeCancelled: false
    });

    renderPage(<OrderDetailsPage />, {
      route: '/orders/1',
      path: '/orders/:id'
    });

    await screen.findByText('ORD-1001');
    await user.click(screen.getByRole('button', { name: 'Cancel order' }));

    await waitFor(() => {
      expect(cancelOrderMock).toHaveBeenCalledWith('1');
    });
  });
});
