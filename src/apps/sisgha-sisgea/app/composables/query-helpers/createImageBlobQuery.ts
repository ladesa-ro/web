import { useQuery } from '@tanstack/vue-query';
import type { IImageBlobQueryConfig, QueryCallOptions } from './interfaces';

export const createImageBlobQuery = (config: IImageBlobQueryConfig) => {
  return (id: MaybeRef<string | null>, _options?: QueryCallOptions) => {
    const query = useQuery({
      queryKey: computed(() => [
        ...config.queryKey,
        'image-blob',
        unref(id),
      ]),
      queryFn: async () => {
        const response = await config.fetcher(unref(id)!);

        if (!(response instanceof Blob)) {
          throw new TypeError('Expected Blob response from image endpoint');
        }

        return URL.createObjectURL(response);
      },
      enabled: computed(() => import.meta.client && !!unref(id)),
    });

    watch(
      () => query.data.value,
      (_newUrl, oldUrl) => {
        if (oldUrl) URL.revokeObjectURL(oldUrl);
      },
    );

    onScopeDispose(() => {
      if (query.data.value) {
        URL.revokeObjectURL(query.data.value);
      }
    });

    const data = computed(() => query.data.value ?? null);

    return { ...query, data };
  };
};
