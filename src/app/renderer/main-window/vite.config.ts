import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'src'),
  base: './',
  build: {
    outDir: path.resolve(__dirname, 'dist-prod'),
    emptyOutDir: true,
  },
  server: {

    port: 5666,
    strictPort: true
  },
})