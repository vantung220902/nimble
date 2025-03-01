import { ApisauceInstance } from 'apisauce';
import _ from 'lodash';
import { Toastify, TokenService } from '..';

type ApiCall = (..._args: any[]) => Promise<any>;

export async function responseWrapper<T>(func: ApiCall, [...args]: any[] = []): Promise<T> {
  try {
    const response = await func(...args);

    if (response.ok) {
      return response.data?.data ?? response.data;
    }

    throw response.data;
  } catch (err) {
    throw err;
  }
}

export async function authResponseWrapper<T>(func: ApiCall, [...args]: any[] = []): Promise<T> {
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {};
      res(response);
    } catch (err) {
      rej(err);
    }
  });
}

export const getResponseData = (data: any) => {
  if (!data) return null;
  return data;
};

export interface ApiResponseType<T> {
  data: T;
  code: number;
  success: boolean;
  timestamp: string;
}

export interface PaginationResponseType<T> {
  data: T[];
  payloadSize?: number;
  hasNext?: boolean;
  skippedRecords?: number;
  totalRecords?: number;
  skip?: number;
  take?: number;
}

export interface ApiPaginationResponseType<T> {
  data: PaginationResponseType<T>;
  code?: number;
  success?: boolean;
  timestamp?: string;
  query?: Object;
}

const debouncedNetworkError = _.debounce((status: number) => {
  if (status === 502 || status === 503 || status === 504) {
    return Toastify.error(
      `The server encountered a temporary error and could not complete your request. Please try again in 30 seconds.`,
      {
        autoClose: false,
      },
    );
  }
}, 300);

export const configApiInstance = (api: ApisauceInstance) => {
  api.addRequestTransform((request) => {
    const accessToken = TokenService.getToken().accessToken;
    console.log('accessToken', accessToken);

    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
  });
  api.addAsyncResponseTransform(async (response) => {
    const status = response.status;
    debouncedNetworkError(status);

    if (status === 500)
      return Toastify.error(
        `The server encountered a temporary error and could not complete your request. Please try again in 30 seconds.`,
      );
  });
};
