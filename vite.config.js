import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  root: './',
  build: {
    outDir: '../temp-deploy/dist',
    emptyOutDir: true,
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         if (id.includes('vue')) return 'vendor-vue';
    //         if (id.includes('pinia')) return 'vendor-pinia';
    //         if (id.includes('vue-router')) return 'vendor-router';
    //         if (id.includes('@stripe/stripe-js') || id.includes('vue-stripe-js'))
    //           return 'vendor-stripe';
    //         if (id.includes('vue3-carousel')) return 'vendor-carousel';
    //         return 'vendor';
    //       }
    //     },
    //   },
    // },
  },
});
