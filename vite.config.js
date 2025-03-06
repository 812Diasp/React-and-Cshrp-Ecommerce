import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middlewares: (app) => {
      app.use((req, res, next) => {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'text/html');
        next();
      });
    },
  },
});
