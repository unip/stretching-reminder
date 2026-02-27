import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main/index.ts'),
      formats: ['cjs'],
      fileName: 'index',
    },
    outDir: 'dist/main',
    emptyOutDir: true,
    rollupOptions: {
      // Only externalize electron-specific modules
      external: ['electron'],
      output: {
        format: 'cjs',
      },
    },
    minify: false,
    sourcemap: true,
    target: 'node18',
    ssr: true, // Enable SSR mode for proper Node.js module handling
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
