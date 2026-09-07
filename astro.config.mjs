import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TEMPORAIRE : tant qu'aucun nom de domaine personnalisé n'est branché,
  // le site vit sur https://johansimonneau.github.io/Balise/ (sous-dossier
  // imposé par GitHub Pages). site + base reflètent cette adresse réelle.
  // Le jour où un domaine perso est configuré (voir README) : remettre
  // site sur ce domaine et base sur '/'.
  site: 'https://johansimonneau.github.io',
  base: '/Balise',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
