import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/_tests_/setup.js',
    include: ['src/_tests_/**/*.test.{js,jsx}'], 
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})
