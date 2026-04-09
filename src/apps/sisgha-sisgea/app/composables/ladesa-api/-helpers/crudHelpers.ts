import type { ApiClient } from '../useApiClient';

// ---------------------------------------------------------------------------
// Helpers para operações CRUD repetitivas nos composables da API.
//
// Cada helper recebe o `api: ApiClient` e a função SDK gerada, e retorna
// uma função com a assinatura esperada pelo composable.
// ---------------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Cria uma função `create` que envia `{ body: data }` para a API.
 *
 * Padrão extraído: `(data) => api.call(apiFn, { body: data })`
 */
export function createCreateFn<TBody, TResult>(
  api: ApiClient,
  apiFn: (opts: any) => Promise<any>,
) {
  return (data: TBody): Promise<TResult> => {
    return api.call(apiFn, { body: data });
  };
}

/**
 * Cria uma função `update` que envia `{ path: { id }, body: data }` para a API.
 *
 * Padrão extraído: `(id, data) => api.call(apiFn, { path: { id }, body: data })`
 */
export function createUpdateFn<TBody, TResult>(
  api: ApiClient,
  apiFn: (opts: any) => Promise<any>,
) {
  return (id: string, data: TBody): Promise<TResult> => {
    return api.call(apiFn, { path: { id }, body: data });
  };
}

/**
 * Cria uma função `remove` que envia `{ path: { id } }` para a API.
 *
 * Padrão extraído: `(id) => api.call(apiFn, { path: { id } })`
 */
export function createRemoveFn(
  api: ApiClient,
  apiFn: (opts: any) => Promise<any>,
) {
  return (id: string): Promise<unknown> => {
    return api.call(apiFn, { path: { id } });
  };
}

/**
 * Cria uma função `uploadImage` (capa ou perfil) que envia
 * `{ path: { id }, body: { file } }` para a API.
 *
 * Padrão extraído: `(id, file) => api.call(apiFn, { path: { id }, body: { file } })`
 */
export function createUploadImageFn(
  api: ApiClient,
  apiFn: (opts: any) => Promise<any>,
) {
  return (id: string, file: Blob): Promise<unknown> => {
    return api.call(apiFn, { path: { id }, body: { file } });
  };
}
