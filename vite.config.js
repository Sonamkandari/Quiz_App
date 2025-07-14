// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Quiz_App/', // 👈 Must match your GitHub repo name
  plugins: [react()],
});
