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

/** Detects flight collection requests, which use public/db.json in production. */
const isFlightCollectionRequest = (input: RequestInfo | URL): boolean => {
  const rawUrl = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
  return new URL(rawUrl, window.location.origin).pathname.replace(/\/+$/, '') === '/flights';
};

/** Applies the app's query filters to the static production flight collection. */
const filterStaticFlights = (payload: unknown, searchParams: URLSearchParams): unknown[] => {
  if (!payload || typeof payload !== 'object' || !Array.isArray((payload as { flights?: unknown }).flights)) return [];
  const flights = (payload as { flights: Record<string, unknown>[] }).flights;
  return flights.filter((flight) => {
    for (const [filterKey, expected] of searchParams.entries()) {
      const match = filterKey.match(/^(.*?)(?::|_)(contains|like|gte|lte|gt|lt)$/i);
      const property = match?.[1] ?? filterKey;
      const operator = match?.[2]?.toLowerCase() ?? 'eq';
      const actual = flight[property];
      if (actual === undefined || actual === null) return false;
      if (operator === 'contains' || operator === 'like') {
        if (!String(actual).toLowerCase().includes(expected.toLowerCase())) return false;
        continue;
      }

      let left: string | number | boolean = actual as string | number | boolean;
      let right: string | number | boolean = expected;
      if (typeof actual === 'number') right = Number(expected);
      else if (typeof actual === 'boolean') right = expected.toLowerCase() === 'true';
      else if (operator !== 'eq' && !Number.isNaN(Number(actual)) && !Number.isNaN(Number(expected))) {
        left = Number(actual);
        right = Number(expected);
      }

      if (operator === 'eq' && String(left).toLowerCase() !== String(right).toLowerCase()) return false;
      if (operator === 'gte' && !(left >= right)) return false;
      if (operator === 'lte' && !(left <= right)) return false;
      if (operator === 'gt' && !(left > right)) return false;
      if (operator === 'lt' && !(left < right)) return false;
    }
    return true;
  });
};

/** Merges URL query parameters with the extra params option. */
const getRequestSearchParams = (input: RequestInfo | URL, params?: ApiFetchOptions['params']): URLSearchParams => {
  const rawUrl = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
  const searchParams = new URL(rawUrl, window.location.origin).searchParams;
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    (Array.isArray(value) ? value : [value]).forEach((item) => {
      if (item !== undefined && item !== null) searchParams.append(key, String(item));
    });
  });
  return searchParams;
};

const normalizeUrl = (input: RequestInfo | URL, baseUrl?: string, params?: Record<string, QueryParamsValue | QueryParamsValue[]>) => {
  const rawUrl = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
  let url = rawUrl;

  if (!baseUrl) {
    baseUrl = import.meta.env.PROD
      ? window.location.origin
      : import.meta.env.VITE_APP_BASE_BACKEND_URL || 'http://localhost:3000';
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

/**
 * Sends a JSON-oriented fetch request with URL parameters, timeout and normalized errors.
 * Relative development URLs use `VITE_APP_BASE_BACKEND_URL` or the local JSON server.
 * Production flight requests load `public/db.json` and apply query filters in the browser.
 * @param input URL, Request, or relative path.
 * @param options Fetch options plus JSON body, query parameters, base URL and timeout.
 * @returns A normalized response containing the decoded body when present.
 */
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
  const staticFlightRequest = import.meta.env.PROD && isFlightCollectionRequest(input);
  if (staticFlightRequest && method !== 'GET') throw new Error('Static production flight data only supports GET requests.');
  const url = staticFlightRequest ? `${window.location.origin}/db.json` : normalizeUrl(input, baseUrl, params);
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
        status: 204
      };
    }

    const payload = hasJsonBody ? await response.json().catch(() => null) : await response.text();

    if (!response.ok) {
      throw new Error(extractErrorMessage(payload));
    }

    return {
      success: response.ok,
      message: response.statusText,
      body: (staticFlightRequest ? filterStaticFlights(payload, getRequestSearchParams(input, params)) : payload) as T | undefined,
      status: response.status
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
