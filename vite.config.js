import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  server: {
    proxy: {
      '/api': {
        target: 'https://fastapi.apmf.com', // Remplacez par l'URL de votre serveur d'API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
