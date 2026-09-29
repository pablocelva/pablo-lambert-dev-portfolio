import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://pablolambert-dev.netlify.app',
  output: 'server',
  adapter: netlify(),
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
