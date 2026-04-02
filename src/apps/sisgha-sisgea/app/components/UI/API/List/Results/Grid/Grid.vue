<script lang="ts" setup>
import { useInfiniteQuery } from '@tanstack/vue-query';
import { useUIApiListContext } from '../../Context/UIApiListContext';
import type { IGridItemSlotProps } from './Typings/IGridItemSlotProps';

type Slots = {
  item(props: IGridItemSlotProps): any;
  'item-skeleton'(props: any): any;
};

defineSlots<Slots>();

const { formWithFilters, formOptions, options } = useUIApiListContext();

const customGridClass = options.gridClass ?? null;

const hasSearchQuery = computed(() => !!formOptions.value.search?.trim());

const query = useInfiniteQuery({
  queryKey: computed(() => [
    ...options.crudModule.baseQueryKeys,
    'list-infinite',
    JSON.stringify(unref(formWithFilters)),
  ]),
  queryFn: ({ pageParam }) =>
    options.crudModule.list({ ...unref(formWithFilters), page: pageParam }),
  getNextPageParam: (last: any) =>
    last?.meta?.currentPage < last?.meta?.totalPages
      ? last.meta.currentPage + 1
      : undefined,
  initialPageParam: 1,
});

const items = computed(() => {
  if (!query.data.value) return null;
  return query.data.value.pages.flatMap((page: any) => page.data ?? []);
});

const paginationMeta = computed(() => {
  const lastPage = query.data.value?.pages.at(-1);
  return {
    totalItems: lastPage?.meta?.totalItems ?? 0,
    currentPage: lastPage?.meta?.currentPage ?? 0,
    totalPages: lastPage?.meta?.totalPages ?? 0,
  };
});

const isLoading = query.isLoading;
const isFetching = query.isFetching;

type InfiniteScrollSide = 'start' | 'end' | 'both';
type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error';

type LoadOptions = {
  done: (status: InfiniteScrollStatus) => void;
  side: InfiniteScrollSide;
};

const load = async ({ done, side }: LoadOptions) => {
  const suspend = () => query.suspense().catch(() => null);

  if (side === 'both' || side === 'end') {
    if (query.isFetchingNextPage.value) {
      await suspend();
    } else {
      await suspend();
      if (query.hasNextPage) {
        await query.fetchNextPage().catch(() => null);
      }
    }

    if (query.isFetchNextPageError.value) {
      done('error');
    } else if (query.hasNextPage.value) {
      done('ok');
    } else {
      done('empty');
    }
  }

  if (side === 'both' || side === 'start') {
    if (query.isFetchingPreviousPage.value) {
      await suspend();
    } else {
      await suspend();
      if (query.hasPreviousPage) {
        await query.fetchPreviousPage().catch(() => null);
      }
    }

    if (query.isFetchPreviousPageError.value) {
      done('error');
    } else if (query.hasPreviousPage.value) {
      done('ok');
    } else {
      done('empty');
    }
  }
};

const skeletonItemsCount = 3 * 6;
const infiniteScrollTrigger = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(entries => {
    const entry = entries[0];
    if (entry?.isIntersecting) {
      load({ done: () => {}, side: 'end' });
    }
  });
  if (infiniteScrollTrigger.value) {
    observer.observe(infiniteScrollTrigger.value);
  }
});

await query.suspense().catch(() => null);
</script>

<template>
  <div class="flex-1">
    <div ref="infiniteScrollTrigger" :class="customGridClass ?? 'ui-api-list-results-grid'">
      <template v-if="items && items.length > 0">
        <template v-for="item in items" :key="item.id">
          <div class="ui-api-list-results-grid-item">
            <slot name="item" v-bind="{ item, isLoading }" />
          </div>
        </template>
      </template>

      <template v-else-if="isLoading">
        <template v-for="item in skeletonItemsCount" :key="item">
          <div class="ui-api-list-results-grid-item">
            <slot name="item-skeleton" />
          </div>
        </template>
      </template>

      <template v-if="!isFetching && paginationMeta.totalItems > 0">
        <div class="col-span-full text-center p-4">
          <p class="font-normal">Você chegou ao fim dos resultados.</p>
          <p class="text-sm">
            Página: {{ paginationMeta.currentPage }} de
            {{ paginationMeta.totalPages }}. Total:
            {{ paginationMeta.totalItems }} registros.
          </p>
        </div>
      </template>

      <template v-else-if="!isFetching && hasSearchQuery">
        <div
          key="no-search-results"
          class="col-span-full min-h-min flex-1 flex flex-col items-center justify-center text-center p-8"
        >
          <h3 class="text-lg font-semibold mb-3">
            Nenhum resultado encontrado.
          </h3>
          <p class="text-sm">
            Tente ajustar seus termos ou filtros de pesquisa. Às vezes, termos
            menos específicos ou consultas mais amplas podem ajudá-lo a
            encontrar o que procura.
          </p>
        </div>
      </template>

      <template v-else-if="!isFetching">
        <div
          key="no-records"
          class="col-span-full min-h-min flex-1 flex flex-col items-center justify-center text-center p-8"
        >
          <h3 class="text-lg font-semibold mb-3">
            Nenhum registro encontrado.
          </h3>
          <p class="text-sm">
            Não há registros cadastrados para exibir.
          </p>
        </div>
      </template>

      <template
        v-if="
          query.isFetchNextPageError.value ||
          query.isFetchPreviousPageError.value
        "
      >
        <div
          class="col-span-full p-4 border border-red-700 bg-red-100 flex items-center justify-between"
        >
          <p class="text-red-700 font-semibold">
            Não foi possível buscar mais conteúdo...
          </p>
          <button
            class="border border-red-700 text-red-700 text-sm px-4 py-1 rounded hover:bg-red-200"
            @click="load({ done: () => {}, side: 'end' })"
          >
            Tentar Novamente
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped src="./Grid.css"></style>
