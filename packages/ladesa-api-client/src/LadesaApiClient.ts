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
  const baseUrl = config?.BASE ?? 'https://dev.ladesa.com.br/api/v1';
  const authToken = config?.TOKEN;

  const _client = createClient(
    createConfig<ApiClientOptions>({
      baseUrl,
    }),
  );

  // TODO: use client `auth` config instead of interceptor once the OpenAPI spec declares `security` on operations (the generated SDK doesn't emit `security`, so `setAuthParams` is never called)
  if (authToken) {
    _client.interceptors.request.use(async (request) => {
      const token = typeof authToken === 'function' ? await authToken() : authToken;
      if (token) {
        request.headers.set('Authorization', `Bearer ${token}`);
      }
      return request;
    });
  }

  return {
    call: (async (fn: any, options?: any) => {
      const result = await fn({ ...options, client: _client });
      if (result && typeof result === 'object' && 'data' in result) {
        return result.data;
      }
      return result;
    }) as LadesaApi['call'],
    client: _client,
    baseUrl,
  };
}
