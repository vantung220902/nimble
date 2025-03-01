import apisauce, { ApiResponse, ApisauceConfig } from 'apisauce';
import { IHttpServiceClient } from './http-service-client.interface';
import { configApiInstance } from './http.helper';

export type IAxiosOptions = ApisauceConfig;

export class AxiosClient implements IHttpServiceClient<IAxiosOptions> {
  public options: ApisauceConfig;

  private axiosInstance: ReturnType<(typeof apisauce)['create']>;

  constructor(options: ApisauceConfig) {
    this.options = options;
    this.axiosInstance = apisauce.create({
      ...options,
    });

    configApiInstance(this.axiosInstance);
  }

  public get<TResponse = unknown, TParams = unknown>(
    url: string,
    params?: TParams,
    options?: Partial<IAxiosOptions>,
  ): Promise<ApiResponse<TResponse>> {
    return this.axiosInstance.get(url, params, options);
  }

  public post<TResponse = unknown, TBody = unknown>(
    url: string,
    body: TBody,
    options?: Partial<IAxiosOptions>,
  ): Promise<ApiResponse<TResponse>> {
    return this.axiosInstance.post(url, body, options);
  }

  public put<TResponse = unknown, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Partial<IAxiosOptions>,
  ): Promise<ApiResponse<TResponse>> {
    return this.axiosInstance.put(url, body, options);
  }

  public patch<TResponse = unknown, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Partial<IAxiosOptions>,
  ): Promise<ApiResponse<TResponse>> {
    return this.axiosInstance.patch(url, body, options);
  }

  public delete<TResponse = unknown, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Partial<IAxiosOptions>,
  ): Promise<ApiResponse<TResponse>> {
    return this.axiosInstance.delete(url, body, options);
  }

  public getOptions() {
    return this.options;
  }
}
