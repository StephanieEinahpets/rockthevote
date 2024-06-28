import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:6666',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:6666',
        changeOrigin: true,
        secure: false,
      },
      '/public': {
        target: 'http://localhost:6666',
        changeOrigin: true,
        secure: false,
      }
    },
  },
});
