import { useState } from '#app';
import { persistQueryClient } from '@tanstack/query-persist-client-core';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import type {
  DehydratedState,
  VueQueryPluginOptions,
} from '@tanstack/vue-query';
import {
  QueryClient,
  VueQueryPlugin,
  dehydrate,
  hydrate,
} from '@tanstack/vue-query';

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query');

  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 60 * 1000,
        refetchOnMount: 'always',
        placeholderData: (prev: any) => prev,
      },
    },
  });

  const options: VueQueryPluginOptions = {
    queryClient,

    clientPersister: (queryClient: any) => {
      let storage: Storage | null = null;

      if (typeof window !== 'undefined') {
        storage = localStorage;
      }

      return persistQueryClient({
        queryClient,

        persister: createSyncStoragePersister({
          key: 'LADESA_WEB_QUERY_CACHE',
          storage: storage ?? undefined,
        }),
      });
    },
  };

  nuxt.vueApp.use(VueQueryPlugin, options);

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    nuxt.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryState.value);
    });
  }
});
