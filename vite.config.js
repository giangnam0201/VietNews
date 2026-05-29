import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/VietNews/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icon.png', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'VietNews - Tin Tức Việt Nam',
        short_name: 'VietNews',
        description: 'Tổng hợp tin tức từ tất cả báo Việt Nam - không quảng cáo',
        theme_color: '#dc2626',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/VietNews/',
        start_url: '/VietNews/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.rss2json\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'rss-feeds',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 30
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
