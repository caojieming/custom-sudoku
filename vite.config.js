import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // change or set to '/' for custom domain or user/org page
  plugins: [react()],
})
