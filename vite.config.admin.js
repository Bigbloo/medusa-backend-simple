import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Optimisations pour accélérer le build
    minify: 'esbuild', // Plus rapide que terser
    target: 'es2020',
    rollupOptions: {
      output: {
        // Réduire le nombre de chunks
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@medusajs/ui']
        }
      }
    },
    // Réduire la taille des source maps
    sourcemap: false,
    // Optimiser les assets
    assetsInlineLimit: 4096,
    // Réduire les warnings
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    // Pré-bundler les dépendances communes
    include: ['react', 'react-dom', '@medusajs/ui']
  },
  esbuild: {
    // Optimisations esbuild
    target: 'es2020',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  }
})
