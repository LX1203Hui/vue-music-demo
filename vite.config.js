import { defineConfig } from 'vite';
import components from 'unplugin-vue-components/vite';
import { VarletUIResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      vue(),
      components({
         resolvers: [VarletUIResolver()],
      }),
   ],
   server: {
      host: '0.0.0.0',
      port: 8080,
   },
});
