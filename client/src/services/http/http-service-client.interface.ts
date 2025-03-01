import { ApiResponse } from 'apisauce';
import { IHttpServiceOptions } from './http-service-options.interface';

export interface IHttpServiceClient<Options extends IHttpServiceOptions> {
  options: Options;
  get<TResponse = unknown>(url: string, options?: Options): Promise<ApiResponse<TResponse>>;
  post<TResponse = unknown, TBody = unknown>(
    url: string,
    body: TBody,
    options?: Options,
  ): Promise<ApiResponse<TResponse>>;
  put<TResponse = unknown, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Options,
  ): Promise<ApiResponse<TResponse>>;
  patch<TResponse = unknown, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Options,
  ): Promise<ApiResponse<TResponse>>;
  delete<TResponse = unknown, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Options,
  ): Promise<ApiResponse<TResponse>>;
}
