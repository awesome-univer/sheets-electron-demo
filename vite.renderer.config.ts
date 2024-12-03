import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

let isDevtools = false;

if (process.argv.includes('--devtools')) {
  isDevtools = true;
}

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    minify: 'esbuild'
  },
  esbuild: {
    pure: isDevtools ? [] : ['console.log'],
  }
});
