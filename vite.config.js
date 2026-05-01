import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/andres-english-tutor/',
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ai-vendor': ['@google/genai'],
          'icons-vendor': ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 3050,
    host: '127.0.0.1',
    strictPort: true
  }
})
