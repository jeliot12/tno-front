import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://tnocoin.ru'
    },
    cors: {
      // origin: ['http://yusupovjasur12151.fvds.ru', 'http://80.87.200.172:4000', 'http://80.87.200.172'],
      origin: ['https://tnocoin.ru', 'http://80.87.200.172', 'https://tnocoin.ru/api'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type']
    },
    port: 5151,
    allowedHosts: ['tnocoin.ru'],

  },
  preview: {
    port: 5151,
  },
})
