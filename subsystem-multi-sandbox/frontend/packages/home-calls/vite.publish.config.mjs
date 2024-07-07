import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig((env) => {
  let config = {
    plugins: [vue(), vueJsx(), cssInjectedByJsPlugin(), externalizeDeps({
      deps: true,
      peerDeps: true,
      include: [
        '@plex/ui',
        'vue',
        'vue-router',
        'pinia',
        /^@mis\//
      ],
      except: [/@mis\/home-calls\//]
    })],
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js",
        '@mis/home-calls': resolve(process.cwd(), './src')
      },
    },
    build: {
      outDir: resolve(process.cwd(), './published'),
      lib: {
        entry: resolve(process.cwd(), './src/index.ts'),
        formats: ['es'],
      },
      cssCodeSplit: true,
    },
  }
  if (env.command === 'serve') {
    config = {
      ...config,
      css: {
        modules: {
          generateScopedName: '[path][local]-[hash:base64:4]'
        }
      }
    };
  }
  return config;
});

