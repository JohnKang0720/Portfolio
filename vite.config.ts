import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base is set to the repo name so assets resolve correctly on GitHub Pages
// (served from https://<user>.github.io/Portfolio/).
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
})
