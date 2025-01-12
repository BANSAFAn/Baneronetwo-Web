import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { plugin as markdown, Mode } from 'vite-plugin-markdown'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    markdown({
      mode: ['html', 'toc'] as Mode[],
      markdownIt: {
        html: true,
        linkify: true,
        typographer: true,
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.md']
})