import { useQuery } from '@tanstack/vue-query';
import filter from 'lodash/filter';
import { castArray } from '../../../../-utils';
import {
  QuerySuspense,
  type QuerySuspenseBehaviour,
} from '../../../../-utils/QuerySuspense';
import type { MaybeRefDeep } from '../../delete';
import type { IUseApiBaseResourceGetRetrivever } from '../typings';

type IUseApiBaseResourceGetOptions<Id = any, ResultItemDto = unknown> = {
  baseQueryKey: MaybeRef<any>[] | MaybeRef<any>;

  id: MaybeRef<Id | null | undefined>;
  apiResourceGetRetriever: IUseApiBaseResourceGetRetrivever<Id, ResultItemDto>;

  suspenseBehaviour?: QuerySuspenseBehaviour;

  itemQueryKeyResolver?: (id: Id) => MaybeRefDeep<any>;
};

export const useApiBaseResourceGet = async <
  Id = any,
  ResultItemDto = unknown,
  ProvidedOptions extends IUseApiBaseResourceGetOptions<
    Id,
    ResultItemDto
  > = IUseApiBaseResourceGetOptions<Id, ResultItemDto>,
>(
  options: ProvidedOptions
) => {
  const {
    //
    id,
    baseQueryKey,
    suspenseBehaviour,
    apiResourceGetRetriever,
    itemQueryKeyResolver = (id) => JSON.stringify(id),
  } = options;

  const baseQueryKeys = castArray(baseQueryKey);

  const queryKey = computed(() => {
    const idRaw = unref(id);

    if (idRaw) {
      const itemQueryKeys = itemQueryKeyResolver(idRaw);
      return filter([...baseQueryKeys, ...itemQueryKeys], Boolean);
    }

    return [...baseQueryKeys, 'placeholder::@::ladesa::never'];
  });

  const query = useQuery({
    queryKey: queryKey,

    queryFn: async () => {
      const idRaw = unref(id);

      if (idRaw) {
        const response = await apiResourceGetRetriever(idRaw);
        return response ?? null;
      }

      return null;
    },
  });

  //

  const isLoading = computed(() => query.isLoading.value);

  //
  const response = computed(() => unref(query.data));
  const previousResponse = ref(unref(response)) as Ref<ResultItemDto | null>;
  //

  await QuerySuspense(query, suspenseBehaviour);

  //

  watch(
    [response],
    ([currentResponse]) => {
      if (currentResponse) {
        previousResponse.value = currentResponse;
      }
    },
    { immediate: true }
  );

  //

  return {
    //
    query,
    //
    response,
    previousResponse,
    //
    isLoading,
  };
};
