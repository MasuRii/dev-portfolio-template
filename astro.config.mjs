// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://masurii.dev',
  integrations: [react(), icon(), sitemap()],
  server: {
    port: 4321,
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true,
    },
    css: {
      devSourcemap: true,
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
});
