// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { visualizer } from 'rollup-plugin-visualizer';

// https://astro.build/config
export default defineConfig({
  site: 'https://masurii.dev',
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imagesConfig: {
      sizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      domains: [],
      formats: ['image/avif', 'image/webp'],
    },
  }),
  integrations: [react(), icon(), sitemap()],
  server: {
    port: 4321,
    host: true,
  },
  vite: {
    plugins: [
      tailwindcss(),
      visualizer({
        filename: 'stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': [
              'react',
              'react-dom',
              '@nanostores/react',
              'nanostores',
            ],
            'vendor-motion': ['motion'],
          },
        },
      },
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
