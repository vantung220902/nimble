import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import { resolve } from 'path';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}
export default defineConfig((_env: ConfigEnv) => {
  const env = loadEnv(_env.mode, process.cwd());
  return {
    plugins: [
      million.vite({ auto: true, telemetry: false, hmr: true, log: false }),
      react({ jsxImportSource: '@emotion/react' }),
      checker({
        typescript: true,
      }),
    ],
    resolve: {
      alias: {
        '@queries': pathResolve('src/queries'),
        '@config': pathResolve('src/config'),
        '@layout': pathResolve('src/layout'),
        '@containers': pathResolve('src/containers'),
        '@components': pathResolve('src/components'),
        '@assets': pathResolve('src/assets'),
        '@providers': pathResolve('src/providers'),
        '@services': pathResolve('src/services'),
        '@stores': pathResolve('src/stores'),
        '@utils': pathResolve('src/utils'),
        src: pathResolve('src'),
        './runtimeConfig': './runtimeConfig.browser',
      },
    },
    base: '/',
    server: {
      host: env.VITE_HOST,
      port: parseInt(env.VITE_PORT, 10),
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  };
});
