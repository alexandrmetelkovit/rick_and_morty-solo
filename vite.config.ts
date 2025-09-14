import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      components: '/src/components',
      widgets: '/src/widgets',
      pages: '/src/pages',
      assets: '/src/assets'
    }
  }
});
