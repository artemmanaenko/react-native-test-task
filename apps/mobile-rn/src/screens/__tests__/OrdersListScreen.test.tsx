import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Button, Text } from 'react-native';
import { OrdersListScreen } from '../OrdersListScreen';

jest.mock('@orders/shared', () => ({
  useOrdersQuery: jest.fn(),
  createOrdersRepository: jest.fn(() => ({}))
}));

jest.mock('../../stores/ordersFilterStore', () => ({
  useOrdersFilterStore: jest.fn()
}));

const mockUseOrdersQuery = jest.requireMock('@orders/shared')
  .useOrdersQuery as jest.Mock;
const mockUseOrdersFilterStore = jest.requireMock(
  '../../stores/ordersFilterStore'
).useOrdersFilterStore as jest.Mock;

const stringifyText = (value: unknown): string =>
  Array.isArray(value) ? value.map(stringifyText).join('') : String(value);

describe('OrdersListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseOrdersFilterStore.mockImplementation(
      (selector: (state: { status: 'all' }) => unknown) =>
        selector({ status: 'all' })
    );
  });

  it('renders query status and orders count from shared query hook', () => {
    mockUseOrdersQuery.mockReturnValue({
      status: 'success',
      data: [{ id: '1' }, { id: '2' }]
    });

    const navigate = jest.fn();
    const tree = renderer.create(
      <OrdersListScreen navigation={{ navigate } as never} />
    );

    const texts = tree.root
      .findAllByType(Text)
      .map((node) => stringifyText(node.props.children));

    expect(texts).toContain('Orders');
    expect(texts).toContain('Query state preview: success');
    expect(texts).toContain('Orders loaded: 2');
  });

  it('navigates to details screen when button is pressed', () => {
    mockUseOrdersQuery.mockReturnValue({
      status: 'pending',
      data: []
    });

    const navigate = jest.fn();
    const tree = renderer.create(
      <OrdersListScreen navigation={{ navigate } as never} />
    );

    const openButton = tree.root.findByType(Button);
    act(() => {
      openButton.props.onPress();
    });

    expect(navigate).toHaveBeenCalledWith('OrderDetails', { orderId: '1' });
  });
});
