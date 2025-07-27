import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 300,
      ignored: ['**/node_modules/**']
    },
    port: 5173,
    strictPort: false
  },
  logLevel: 'info',
  clearScreen: false
});
