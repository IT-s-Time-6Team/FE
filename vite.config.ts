import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://dev.okii.kr',
        changeOrigin: true,
        secure: false,
      },
      '/api/connect': {
        target: 'https://dev.okii.kr',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  define: {
    global: 'globalThis',
  },
});
