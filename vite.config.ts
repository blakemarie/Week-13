import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/books': {
        target: 'http://localhost:3000',  // JSON server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/books/, '/books'),
      },
    },
  },
});