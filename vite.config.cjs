const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const { VitePWA } = require('vite-plugin-pwa');

module.exports = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // This includes the icons in the build process
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Social-Bridge',
        short_name: 'SocialBridge',
        description: 'Autism-friendly social communication tool',
        theme_color: '#38bdf8',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon192.png', // Updated to match your filename
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icon512.png', // Updated to match your filename
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // This ensures the app works offline
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jsx}']
      }
    })
  ],
  server: {
    port: 3000,
    open: true
  }
});