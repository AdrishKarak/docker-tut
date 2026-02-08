import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // CRITICAL → binds to 0.0.0.0 (Docker access)
    port: 5173,
    strictPort: true,    // prevents Vite auto-switching ports
    watch: {
      usePolling: true   // required for file changes in Docker volumes
    }
  }
})
