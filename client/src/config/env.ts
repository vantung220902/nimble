export const appEnv = {
  MODE: import.meta.env.MODE,
  NODE_ENV: import.meta.env.NODE_ENV,
  APP_VERSION: import.meta.env.VITE_VERSION || '0.1.0',
  BUILD_MODE: import.meta.env.VITE_BUILD_MODE || 'development',
  COOKIE_DOMAIN: import.meta.env.VITE_COOKIE_DOMAIN,
  API_URL: import.meta.env.VITE_API_URL,
  WEB_URL: import.meta.env.VITE_WEB_URL,
};
