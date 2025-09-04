// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/contacts': {
        target: 'http://backend:8000',
        changeOrigin: true,
        secure: false,
      },
      '/messages': {
        target: 'http://backend:8000',
        changeOrigin: true,
        secure: false,
      },
    },
    watch: {
      usePolling: true,
    },
    host: true, // allow access from outside container
    strictPort: true,
  },
})
