import { createOrdersRepository } from '../src/data/orders/orders.repository';
import type { HttpClient } from '../src/contracts/http-client';

describe('createOrdersRepository', () => {
  it('normalizes data for orders list', async () => {
    const httpClient: HttpClient = {
      get: jest.fn().mockResolvedValue([
        {
          id: '1',
          number: 'ORD-001',
          status: 'new',
          customerName: '  John Smith  ',
          totalAmount: 150,
          currency: 'usd',
          createdAt: '2026-01-01T09:00:00.000Z',
          itemsCount: 2
        }
      ]),
      post: jest.fn()
    };

    const repository = createOrdersRepository(httpClient);
    const result = await repository.getOrders();

    expect(result[0].customerName).toBe('John Smith');
    expect(result[0].currency).toBe('USD');
  });

  it('normalizes details response', async () => {
    const httpClient: HttpClient = {
      get: jest.fn().mockResolvedValue({
        id: '1',
        number: 'ORD-001',
        status: 'new',
        customerName: ' Jane Doe ',
        totalAmount: 100,
        currency: 'eur',
        createdAt: '2026-01-01T09:00:00.000Z',
        itemsCount: 1,
        shippingAddress: ' Main Street 1 ',
        items: [
          { id: 'i1', title: ' Item A ', quantity: 1, price: 100 }
        ],
        canBeCancelled: true
      }),
      post: jest.fn()
    };

    const repository = createOrdersRepository(httpClient);
    const result = await repository.getOrderDetails('1');

    expect(result.shippingAddress).toBe('Main Street 1');
    expect(result.items[0].title).toBe('Item A');
    expect(result.currency).toBe('EUR');
  });

  it('cancels order through repository', async () => {
    const httpClient: HttpClient = {
      get: jest.fn(),
      post: jest.fn().mockResolvedValue({
        id: '1',
        number: 'ORD-001',
        status: 'cancelled',
        customerName: ' Jane Doe ',
        totalAmount: 100,
        currency: 'usd',
        createdAt: '2026-01-01T09:00:00.000Z',
        itemsCount: 1,
        shippingAddress: ' Main Street 1 ',
        items: [{ id: 'i1', title: ' Item A ', quantity: 1, price: 100 }],
        canBeCancelled: false
      })
    };

    const repository = createOrdersRepository(httpClient);
    const result = await repository.cancelOrder('1');

    expect(httpClient.post).toHaveBeenCalledWith('/orders/1/cancel');
    expect(result.status).toBe('cancelled');
    expect(result.canBeCancelled).toBe(false);
  });
});
