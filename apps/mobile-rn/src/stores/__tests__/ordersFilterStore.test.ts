const FILTER_KEY = 'orders.filter.status';

const loadStore = (initialValue: string | null) => {
  const setString = jest.fn();

  jest.resetModules();
  jest.doMock('../../platform-rn/storage/storage', () => ({
    appStorage: {
      getString: () => initialValue,
      setString,
      remove: jest.fn()
    }
  }));

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useOrdersFilterStore } = require('../ordersFilterStore');

  return { useOrdersFilterStore, setString };
};

describe('useOrdersFilterStore', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('reads valid initial status from storage', () => {
    const { useOrdersFilterStore } = loadStore('processing');

    expect(useOrdersFilterStore.getState().status).toBe('processing');
  });

  it('falls back to all for invalid storage value', () => {
    const { useOrdersFilterStore } = loadStore('unexpected-status');

    expect(useOrdersFilterStore.getState().status).toBe('all');
  });

  it('persists selected status through storage adapter', () => {
    const { useOrdersFilterStore, setString } = loadStore('all');

    useOrdersFilterStore.getState().setStatus('cancelled');

    expect(useOrdersFilterStore.getState().status).toBe('cancelled');
    expect(setString).toHaveBeenCalledWith(FILTER_KEY, 'cancelled');
  });
});
