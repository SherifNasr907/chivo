import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is set for flexible static hosting (e.g. under a subpath).
export default defineConfig({
  plugins: [react()],
  base: './',
})
