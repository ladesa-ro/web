import {
  createClient,
  createConfig,
  type Client,
} from './__generated__/client';
import type { ClientOptions as ApiClientOptions } from './__generated__/types.gen';

export type LadesaApiClientConfig = {
  BASE?: string;
  TOKEN?: (() => Promise<string | undefined> | string | undefined) | string;
};

/** Extracts the success data type from an SDK function's return. */
export type SdkResponseData<TFn extends (...args: any[]) => Promise<any>> =
  NonNullable<Awaited<ReturnType<TFn>>['data']>;

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown) {
    super(ApiError.extractMessage(body));
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }

  private static extractMessage(body: unknown): string {
    if (body && typeof body === 'object' && 'message' in body) {
      const message = (body as { message?: unknown }).message;
      if (typeof message === 'string') return message;
      if (Array.isArray(message)) return message.join(' ');
    }
    if (typeof body === 'string' && body.length > 0) return body;
    return 'Ocorreu um erro na comunicação com o servidor.';
  }
}

export type LadesaApi = {
  call: <TFn extends (...args: any[]) => Promise<any>>(
    fn: TFn,
    ...args: [] extends Parameters<TFn>
      ? [options?: Omit<NonNullable<Parameters<TFn>[0]>, 'client'>]
      : [options: Omit<Parameters<TFn>[0], 'client'>]
  ) => Promise<SdkResponseData<TFn>>;
  readonly client: Client;
  readonly baseUrl: string;
};

export function createLadesaApi(config?: LadesaApiClientConfig): LadesaApi {
  const baseUrl = config?.BASE ?? '/';
  const authToken = config?.TOKEN;

  const _client = createClient(
    createConfig<ApiClientOptions>({
      baseUrl,
    })
  );

  // TODO: use client `auth` config instead of interceptor once the OpenAPI spec declares `security` on operations (the generated SDK doesn't emit `security`, so `setAuthParams` is never called)
  if (authToken) {
    _client.interceptors.request.use(async request => {
      const token =
        typeof authToken === 'function' ? await authToken() : authToken;
      if (token) {
        request.headers.set('Authorization', `Bearer ${token}`);
      }
      return request;
    });
  }

  return {
    call: (async (fn: any, options?: any) => {
      const result = await fn({ ...options, client: _client });
      if (result && typeof result === 'object') {
        if ('error' in result && result.error) {
          const status = result.response?.status ?? 0;
          throw new ApiError(status, result.error);
        }
        if ('data' in result) {
          return result.data;
        }
      }
      return result;
    }) as LadesaApi['call'],
    client: _client,
    baseUrl,
  };
}
