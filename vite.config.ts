import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Set base path for GitHub Pages deployment (can be overridden via VITE_BASE_PATH or GITHUB_REPOSITORY)
const REPO_NAME = process.env.VITE_BASE_PATH || (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : './')

// https://vite.dev/config/
export default defineConfig({
  base: REPO_NAME,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
