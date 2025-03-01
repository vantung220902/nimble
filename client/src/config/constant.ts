import { appEnv } from './env';

const isProd = appEnv.NODE_ENV === 'production';
const isLocal = appEnv.NODE_ENV === 'development';

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * 60 * ONE_SECOND;
const ONE_KB = 1024;
const ONE_MB = ONE_KB * ONE_KB;

const commonConfigs = {
  CONNECTION_TIMEOUT: 30 * ONE_SECOND,
  MAXIMUM_FILE_SIZE: ONE_MB * 25,
  WAITING_TIME: 5 * ONE_SECOND,
  ANIMATION_TIME: 0.3 * ONE_SECOND,
  MAXIMUM_AVATAR_SIZE: 16 * ONE_MB,
};

const table = {
  ROWS_PER_PAGE_OPTIONS: [5, 10, 20, 30, 50],
  ROWS_PER_PAGE: 10,
  TRANSLATIONS_ROWS_PER_PAGE: 10,
};

const textLength = {
  CODE_LENGTH: 16,
  TEXT_SHORT_LENGTH: 50,
  TEXT_MEDIUM_LENGTH: 100,
  TEXT_MAX_LENGTH: 255,
  VERIFICATION_CODE_LENGTH: 6,
};

const appConstant = {
  isProd,
  isLocal,
  ONE_HOUR,
  ONE_SECOND,
  ONE_MINUTE,
  ONE_KB,
  ONE_MB,
  ...commonConfigs,
  ...table,
  ...textLength,
};

export default appConstant;
