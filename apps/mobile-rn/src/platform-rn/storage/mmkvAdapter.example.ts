import type { KeyValueStorage } from './storage';

// Example only. Keep in-memory storage by default for low setup friction.
// Replace implementation with MMKV when needed.
export const createMmkvStorage = (): KeyValueStorage => {
  throw new Error('MMKV adapter is not configured in this starter repository.');
};
