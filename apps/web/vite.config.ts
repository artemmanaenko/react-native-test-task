import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@orders/shared': path.resolve(__dirname, '../../packages/shared/src')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text-summary'],
      thresholds: {
        lines: 40,
        statements: 40,
        functions: 30,
        branches: 20
      }
    }
  }
});
