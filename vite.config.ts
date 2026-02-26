import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist/renderer',
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
});

export function buildMainProcess() {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/main/index.ts'),
        formats: ['es'],
        fileName: 'index',
      },
      outDir: 'dist/main',
      emptyOutDir: true,
      rollupOptions: {
        external: ['electron'],
        output: {
          format: 'es',
        },
      },
      minify: false,
      sourcemap: true,
    },
  };
}
