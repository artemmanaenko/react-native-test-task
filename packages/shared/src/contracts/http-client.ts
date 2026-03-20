export type HttpQueryValue = string | number | boolean | undefined;

export type HttpRequestConfig = {
  query?: Record<string, HttpQueryValue>;
  headers?: Record<string, string>;
};

export interface HttpClient {
  get<TResponse>(path: string, config?: HttpRequestConfig): Promise<TResponse>;
  post<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    config?: HttpRequestConfig
  ): Promise<TResponse>;
}
