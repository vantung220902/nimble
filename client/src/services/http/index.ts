import appConstant from '@config/constant';
import { appEnv } from '@config/env';
import axios from 'axios';
import { AxiosClient } from './axios-client';

axios.defaults.withCredentials = true;

export const httpService = new AxiosClient({
  baseURL: appEnv.API_URL,
  headers: { Accept: 'application/json' },
  timeout: appConstant.CONNECTION_TIMEOUT,
});

export {
  authResponseWrapper,
  configApiInstance,
  getResponseData,
  responseWrapper,
} from './http.helper';

export type {
  ApiPaginationResponseType,
  ApiResponseType,
  PaginationResponseType,
} from './http.helper';
