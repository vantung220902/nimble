/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly VITE_HOST: string;
  readonly VITE_PORT: string;
  readonly VITE_VERSION: string;
  readonly VITE_BUILD_MODE: string;
  readonly VITE_COOKIE_DOMAIN: string;
  readonly VITE_API_URL: string;
  readonly VITE_WEB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
