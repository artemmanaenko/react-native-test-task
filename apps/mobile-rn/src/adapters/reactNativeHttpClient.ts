import type { HttpClient, HttpRequestConfig } from '@orders/shared';

const appendQuery = (url: string, query?: HttpRequestConfig['query']): string => {
  if (!query) {
    return url;
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  const search = params.toString();
  return search.length ? `${url}?${search}` : url;
};

export const createReactNativeHttpClient = (baseUrl: string): HttpClient => ({
  async get<TResponse>(path: string, config?: HttpRequestConfig) {
    const response = await fetch(appendQuery(`${baseUrl}${path}`, config?.query), {
      method: 'GET',
      headers: config?.headers
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(body || `HTTP ${response.status}`);
    }

    return (await response.json()) as TResponse;
  },
  async post<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    config?: HttpRequestConfig
  ) {
    const response = await fetch(appendQuery(`${baseUrl}${path}`, config?.query), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(config?.headers ?? {})
      },
      body: body === undefined ? undefined : JSON.stringify(body)
    });

    if (!response.ok) {
      const responseBody = await response.text();
      throw new Error(responseBody || `HTTP ${response.status}`);
    }

    return (await response.json()) as TResponse;
  }
});
