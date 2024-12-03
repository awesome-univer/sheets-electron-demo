import { defineConfig } from 'vite';

let isDevtools = false;

if (process.argv.includes('--devtools')) {
  isDevtools = true;
}

// https://vitejs.dev/config
export default defineConfig({
  build: {
    minify: 'esbuild'
  },
  esbuild: {
    pure: isDevtools ? [] : ['console.log'],
  }
});
