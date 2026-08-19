import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        letter: 'letter.html',
        sorting: 'sorting.html',
        wand: 'wand.html',
        Patronus: 'Patronus.html',
        boggarts: 'boggarts.html',
      },
    },
  },
});