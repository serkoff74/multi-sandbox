import { defineConfig, loadEnv, mergeConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {resolve} from "path";

const plugins = [vue(), vueJsx()];

export default defineConfig(async (env) => {
  let localConfig = {};
  try {
    localConfig = (await import("./vite.config.local.mjs")).default;
  } catch (e) {
    localConfig = {};
  }

  const misngConfig = loadEnv(env.mode, process.cwd(), '');
  return mergeConfig(
    {
      plugins: plugins,
      define: {
        "process.env": process.env,
        "MISNG_CONFIG": misngConfig || {},
      },
      resolve: {
        alias: {
          vue: "vue/dist/vue.esm-bundler.js",
          '@mis/home-calls': resolve(process.cwd(), './packages/home-calls/src'),
          '@mis/schedules': resolve(process.cwd(), './packages/schedules/src')
        },
      },
      envPrefix: "APPOINTMENTS_",
      css: {
        modules: {
          generateScopedName: "[path][local]-[hash:base64:4]",
        },
      }
    },
    localConfig,
  );
});


