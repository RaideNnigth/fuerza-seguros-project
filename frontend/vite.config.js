import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  plugins: [react()],
  server: isDev
    ? {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, './cert/key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, './cert/cert.pem')),
        },
        proxy: {
          '/api': {
            target: 'https://localhost:3000',
            changeOrigin: true,
            secure: false,
          },
        },
        port: 5173,
        host: true,
      }
    : {},
});
