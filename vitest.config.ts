import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '.astro/**',
        'tests/**',
        '**/*.d.ts',
        '**/*.types.ts',
        '**/*.css',
        '**/*.module.css',
        'astro.config.mjs',
        'vitest.config.ts'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@layouts': path.resolve(import.meta.dirname, './src/layouts'),
      '@lib': path.resolve(import.meta.dirname, './src/lib'),
      '@data': path.resolve(import.meta.dirname, './src/data'),
      '@styles': path.resolve(import.meta.dirname, './src/styles')
    }
  }
});
