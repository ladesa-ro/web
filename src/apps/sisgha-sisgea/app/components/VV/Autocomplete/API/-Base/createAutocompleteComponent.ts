import type { MaybeRef } from 'vue';
import { createUIAutocompleteApiRetrieverOptions } from './index';

export type AutocompleteEntityConfig = {
  label: string;
  placeholder?: string;
  baseQueryKeys: MaybeRef<readonly string[] | string[]>;
  listFn: (...args: any[]) => any;
  getOneFn: (...args: any[]) => any;
  transformer: (item: any) => { label: string; value: any };
};

export function useAutocompleteEntity(config: {
  baseQueryKeys: MaybeRef<readonly string[] | string[]>;
  listFn: (...args: any[]) => any;
  getOneFn: (params: { path: { id: any } }) => any;
  transformer: (item: any) => { label: string; value: any };
  listAdapter?: (api: ReturnType<typeof useApiClient>, data: any) => any;
  getOneAdapter?: (api: ReturnType<typeof useApiClient>, id: string) => any;
}) {
  const api = useApiClient();

  const crudModule = {
    baseQueryKeys: config.baseQueryKeys,
    list: config.listAdapter
      ? (data: any) => config.listAdapter!(api, data)
      : (data: any) => api.call(config.listFn, { query: data }),
    getOne: config.getOneAdapter
      ? (id: string) => config.getOneAdapter!(api, id)
      : (id: string) => api.call(config.getOneFn, { path: { id } }),
  };

  const options = createUIAutocompleteApiRetrieverOptions({
    crudModule,
    transformer: config.transformer,
  });

  return { api, crudModule, options };
}
