import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  preview: {
    allowedHosts: ['movie-management-frontend-e8yx.onrender.com']
  }
})