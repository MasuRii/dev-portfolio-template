// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { visualizer } from 'rollup-plugin-visualizer';

// Detect deployment environment
const isVercel = process.env.VERCEL === '1';

// Configure site URL and base path based on deployment target
const site = isVercel
  ? process.env.SITE || 'https://masurii.dev'
  : 'https://masurii.github.io';
const base = isVercel ? '/' : '/dev-portfolio-template/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  output: 'static',
  adapter: isVercel
    ? vercel({
        webAnalytics: {
          enabled: true,
        },
        imagesConfig: {
          sizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          domains: [],
          formats: ['image/avif', 'image/webp'],
        },
      })
    : undefined,
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
      cssMinify: true,
      minify: 'esbuild',
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
    esbuild: {
      legalComments: 'none',
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
