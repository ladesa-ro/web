import type {
  InfiniteData,
  UseInfiniteQueryReturnType,
  UseQueryReturnType,
} from '@tanstack/vue-query';

// ============================================================
// Query helper config interfaces (input para os helpers)
// ============================================================

export interface IListQueryConfig<TResult, TParams = unknown> {
  queryKey: readonly string[];
  fetcher: (params?: TParams | undefined) => Promise<TResult>;
}

export interface IInfiniteListQueryConfig<TResult, TParams = unknown> {
  queryKey: readonly string[];
  fetcher: (
    params?: (TParams & { page?: number }) | undefined
  ) => Promise<TResult>;
}

export interface IFindOneQueryConfig<TResult> {
  queryKey: readonly string[];
  fetcher: (id: string) => Promise<TResult>;
}

// ============================================================
// Opções de chamada (call-site)
// ============================================================

export type QueryCallOptions = {
  /** Se `false`, desabilita o suspend automático no SSR. Default: `true`. */
  suspend?: boolean;
};

// ============================================================
// Tipos auxiliares para as capabilities
// ============================================================

export type ListFn<TResult, TParams = unknown> = (
  params?: MaybeRef<TParams | undefined>,
  options?: QueryCallOptions
) => UseQueryReturnType<TResult, Error>;

export type ListInfiniteFn<TResult, TParams = unknown> = (
  params?: MaybeRef<TParams | undefined>,
  options?: QueryCallOptions
) => UseInfiniteQueryReturnType<InfiniteData<TResult, unknown>, Error>;

export type FindOneFn<TResult> = (
  id: MaybeRef<string | null>,
  options?: QueryCallOptions
) => UseQueryReturnType<TResult | null, Error>;

export type CreateFn<TInput, TResult = unknown> = (
  data: TInput
) => Promise<TResult>;

export type UpdateFn<TInput, TResult = void> = (
  id: string,
  data: TInput
) => Promise<TResult>;

export type RemoveFn = (id: string) => Promise<unknown>;

export type InvalidateFn = () => Promise<void>;

export type UploadCoverFn = (id: string, file: Blob) => Promise<unknown>;

export type UploadProfileFn = (id: string, file: Blob) => Promise<unknown>;

export interface IImageBlobQueryConfig {
  queryKey: readonly string[];
  fetcher: (id: string) => Promise<unknown>;
}

export type ImageBlobFn = (
  id: MaybeRef<string | null>,
  options?: QueryCallOptions
) => Omit<UseQueryReturnType<string, Error>, 'data'> & { data: ComputedRef<string | null> };
