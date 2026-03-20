import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';
import { OrderDetailsScreen } from '../OrderDetailsScreen';

jest.mock('@orders/shared', () => ({
  useOrderDetailsQuery: jest.fn(),
  createOrdersRepository: jest.fn(() => ({}))
}));

const mockUseOrderDetailsQuery = jest.requireMock('@orders/shared')
  .useOrderDetailsQuery as jest.Mock;

const stringifyText = (value: unknown): string =>
  Array.isArray(value) ? value.map(stringifyText).join('') : String(value);

describe('OrderDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders order id and query status from shared details hook', () => {
    mockUseOrderDetailsQuery.mockReturnValue({
      status: 'pending'
    });

    const tree = renderer.create(
      <OrderDetailsScreen route={{ params: { orderId: '42' } } as never} />
    );

    const texts = tree.root
      .findAllByType(Text)
      .map((node) => stringifyText(node.props.children));

    expect(texts).toContain('Order Details');
    expect(texts).toContain('Order id: 42');
    expect(texts).toContain('Query state preview: pending');
  });
});
