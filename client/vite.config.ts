import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss()
  ],
  // Dev proxy to avoid cross-site cookies issues during development.
  // This makes requests to `/api` same-origin so httpOnly cookies are sent on refresh
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.VITE_PUBLIC_URL || 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
