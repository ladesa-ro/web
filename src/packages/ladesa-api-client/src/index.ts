export {
  createLadesaApi,
  type LadesaApi,
  type LadesaApiClientConfig,
  type SdkResponseData,
} from './LadesaApiClient';
export * from './__generated__/sdk.gen';
export type * from './__generated__/types.gen';
export {
  createClient,
  createConfig,
  type Client,
  type Config,
} from './__generated__/client';

// Helper type aliases for accessing nested Data type properties
export type ReqBody<T extends { body?: unknown }> = T['body'];
export type ReqQuery<T extends { query?: unknown }> = T['query'];
export type ReqPath<T extends { path?: unknown }> = T['path'];
