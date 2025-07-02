import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import compression from 'vite-plugin-compression';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  base: mode === 'production' ? '/' : './',
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Compression gzip et brotli pour la production
    mode === 'production' && compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    mode === 'production' && compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Force single instance of React to avoid conflicts
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'framer-motion',
      'recharts',
      'lucide-react',
    ],
    // Optimisations des dépendances
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    // Configuration de build simplifiée et stable
    minify: 'terser',
    terserOptions: {
      compress: {
        // Garder les console.error pour débugger
        drop_console: false,
        drop_debugger: false,
        // Optimisations sûres seulement
        unsafe: false,
        passes: 1,
      },
      mangle: {
        toplevel: false, // Plus sûr pour éviter les conflits
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        // Configuration simplifiée des chunks
        manualChunks: undefined, // Laisser Vite gérer automatiquement
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      // Tree-shaking plus conservateur
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: true,
        unknownGlobalSideEffects: true,
      },
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    target: 'es2020', // Plus compatible
    sourcemap: true, // Activer pour débugger
  },
}));
