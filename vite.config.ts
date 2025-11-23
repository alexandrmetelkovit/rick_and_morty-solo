import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/rick_and_morty-solo/',
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
