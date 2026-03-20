export interface KeyValueStorage {
  getString: (key: string) => string | null;
  setString: (key: string, value: string) => void;
  remove: (key: string) => void;
}

export const createInMemoryStorage = (): KeyValueStorage => {
  const data = new Map<string, string>();

  return {
    getString(key) {
      return data.get(key) ?? null;
    },
    setString(key, value) {
      data.set(key, value);
    },
    remove(key) {
      data.delete(key);
    }
  };
};

// Optional upgrade path: replace with MMKV adapter in this module.
export const appStorage: KeyValueStorage = createInMemoryStorage();
