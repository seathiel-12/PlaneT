import type { HTTPResponse } from "../../types";

type QueryParamsValue = string | number | boolean | null | undefined;

export type ApiFetchOptions<TBody = unknown> = Omit<RequestInit, 'body' | 'headers'> & {
  body?: TBody;
  headers?: HeadersInit;
  params?: Record<string, QueryParamsValue | QueryParamsValue[]>;
  timeout?: number;
  baseUrl?: string;
};

const DEFAULT_TIMEOUT = 15000;

const normalizeUrl = (input: RequestInfo | URL, baseUrl?: string, params?: Record<string, QueryParamsValue | QueryParamsValue[]>) => {
  const rawUrl = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
  let url = rawUrl;

  if (!baseUrl) {
    baseUrl = 'http://localhost:3000';
    if (baseUrl && !/^https?:\/\//i.test(url) && !url.startsWith('/')) {
      const normalizedBase = baseUrl.replace(/\/+$/, '');
      const normalizedPath = url.replace(/^\/+/, '');
      url = `${normalizedBase}/${normalizedPath}`;
    }
  }

  if (!params || Object.keys(params).length === 0) {
    return url;
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          searchParams.append(key, String(item));
        }
      });
      return;
    }

    searchParams.append(key, String(value));
  });

  const queryString = searchParams.toString();
  if (!queryString) {
    return url;
  }

  return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
};

const extractErrorMessage = (payload: unknown): string => {
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;

    if (typeof record.message === 'string' && record.message.trim()) {
      return record.message;
    }

    if (typeof record.error === 'string' && record.error.trim()) {
      return record.error;
    }

    if (typeof record.detail === 'string' && record.detail.trim()) {
      return record.detail;
    }

    if (Array.isArray(record.errors) && record.errors.length > 0) {
      const firstMessage = record.errors[0];
      if (typeof firstMessage === 'string' && firstMessage.trim()) {
        return firstMessage;
      }
    }
  }

  if (typeof payload === 'string' && payload.trim()) {
    return payload;
  }

  return 'Request failed';
};

export async function apiFetch<T>(
  input: RequestInfo | URL,
  options: ApiFetchOptions = {},
): Promise<HTTPResponse<T | undefined>> {
  const {
    body,
    headers,
    params,
    timeout = DEFAULT_TIMEOUT,
    baseUrl,
    ...requestInit
  } = options;

  const method = (requestInit.method ?? 'GET').toUpperCase();
  const url = normalizeUrl(input, baseUrl, params);
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeout);

  const requestHeaders = new Headers(headers);

  if (body !== undefined && body !== null && !(body instanceof FormData) && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(url, {
      ...requestInit,
      method,
      headers: requestHeaders,
      body: (() => {
        if (body === undefined || body === null) {
          return method === 'GET' || method === 'HEAD' ? undefined : undefined;
        }

        if (body instanceof FormData || body instanceof URLSearchParams) {
          return body;
        }

        if (body instanceof Blob || body instanceof ArrayBuffer || ArrayBuffer.isView(body)) {
          return body as BodyInit;
        }

        if (typeof body === 'string') {
          return body;
        }

        return JSON.stringify(body);
      })(),
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') ?? '';
    const hasJsonBody = contentType.includes('application/json') || contentType.includes('+json');

    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {
        success: response.ok,
        message: response.statusText,
        body: undefined,
      };
    }

    const payload = hasJsonBody ? await response.json().catch(() => null) : await response.text();

    if (!response.ok) {
      throw new Error(extractErrorMessage(payload));
    }

    return {
      success: response.ok,
      message: response.statusText,
      body: payload ?? undefined,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timed out');
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('An unexpected error occurred during the request');
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export default apiFetch;
