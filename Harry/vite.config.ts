import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

export default defineConfig({
  plugins: [react()],

  base: './',

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        Army: resolve(__dirname, 'Army.html'),
        boggarts: resolve(__dirname, 'boggarts.html'),
        book: resolve(__dirname, 'book.html'),
        creature: resolve(__dirname, 'creature.html'),
        curses: resolve(__dirname, 'curses.html'),
        deadly: resolve(__dirname, 'deadly.html'),
        duels: resolve(__dirname, 'duels.html'),
        letter: resolve(__dirname, 'letter.html'),
        movie: resolve(__dirname, 'movie.html'),
        news: resolve(__dirname, 'news.html'),
        Patronus: resolve(__dirname, 'Patronus.html'),
        places: resolve(__dirname, 'places.html'),
        sorting: resolve(__dirname, 'sorting.html'),
        spells: resolve(__dirname, 'spells.html'),
        wand: resolve(__dirname, 'wand.html'),
      },
    },
  },
});