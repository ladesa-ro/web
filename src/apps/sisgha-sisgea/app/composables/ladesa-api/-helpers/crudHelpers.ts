import type { ApiClient } from '../useApiClient';

/* eslint-disable @typescript-eslint/no-explicit-any */

export function createCreateFn<TBody, TResult>(
  api: ApiClient,
  apiFn: (opts: any) => Promise<any>
) {
  return (data: TBody): Promise<TResult> => {
    return api.call(apiFn, { body: data });
  };
}

export function createUpdateFn<TBody, TResult>(
  api: ApiClient,
  apiFn: (opts: any) => Promise<any>
) {
  return (id: string, data: TBody): Promise<TResult> => {
    return api.call(apiFn, { path: { id }, body: data });
  };
}

export function createRemoveFn(
  api: ApiClient,
  apiFn: (opts: any) => Promise<any>
) {
  return (id: string): Promise<unknown> => {
    return api.call(apiFn, { path: { id } });
  };
}

export function createUploadImageFn(
  api: ApiClient,
  apiFn: (opts: any) => Promise<any>
) {
  return (id: string, file: Blob): Promise<unknown> => {
    return api.call(apiFn, { path: { id }, body: { file } });
  };
}
