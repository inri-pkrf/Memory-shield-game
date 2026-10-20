import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'node:path'

// https://vite.dev/config/
// ב-GitHub Pages האתר יושב תחת /Memory-shield-game/ ולא תחת /
const isPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
  base: isPages ? '/Memory-shield-game/' : '/',
  plugins: [
    // תוסף Base44 נחוץ רק בסביבת Base44; ב-GitHub Pages לא צריך אותו
    ...(isPages ? [] : [base44({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    })]),
    react(),
  ]
});
