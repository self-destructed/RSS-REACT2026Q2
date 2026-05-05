import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/RSS-REACT2026Q2/',
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // Allows using describe/it/expect without importing
    environment: 'jsdom', // Simulates the browser DOM
    setupFiles: ['./src/__tests__/setupTests.ts'], // Global setup file
    css: true, // Processes CSS in tests (useful for CSS modules)

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/**/*.d.ts',
        'src/**/*.stories.{ts,tsx}',
        'src/types/**',
      ],

      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
        // statements: 80,
        // branches: 50,
        // functions: 50,
        // lines: 50,
      },
    },
  },
});
