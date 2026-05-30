import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/VietNews/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.png', 'icon-192.png', 'icon-512.png', 'icon.svg'],
      manifest: {
        name: 'VietNews - Tin Tức Việt Nam',
        short_name: 'VietNews',
        description: 'Tổng hợp tin tức từ tất cả báo Việt Nam - không quảng cáo',
        theme_color: '#E53935',
        background_color: '#F5F5F7',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/VietNews/',
        start_url: '/VietNews/',
        categories: ['news', 'magazines'],
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/(api\.allorigins\.win|corsproxy\.io|api\.codetabs\.com)\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'rss-feeds',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 15 },
              networkTimeoutSeconds: 10
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
});
