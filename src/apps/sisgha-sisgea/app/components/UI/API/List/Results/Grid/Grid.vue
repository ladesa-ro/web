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
  const suspend = () =>
    suspendQuery(query, { mode: QuerySuspenseBehaviourMode.WAIT_UNTIL_FINISH });

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

await suspendQuery(query);
</script>

<template>
  <div class="u-flex-1">
    <div
      ref="infiniteScrollTrigger"
      :class="customGridClass ?? 'ui-api-list-results-grid'"
    >
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
        <div class="u-text-center u-p-4 grid-results__span-full">
          <p class="u-font-regular">Você chegou ao fim dos resultados.</p>
          <p class="u-text-sm">
            Página: {{ paginationMeta.currentPage }} de
            {{ paginationMeta.totalPages }}. Total:
            {{ paginationMeta.totalItems }} registros.
          </p>
        </div>
      </template>

      <template v-else-if="!isFetching && hasSearchQuery">
        <UIEmptyState
          key="no-search-results"
          illustration="none"
          class="grid-results__span-full grid-results__empty-state"
          title="Nenhum resultado encontrado."
          description="Tente ajustar seus termos ou filtros de pesquisa. Às vezes, termos menos específicos ou consultas mais amplas podem ajudá-lo a encontrar o que procura."
        />
      </template>

      <template v-else-if="!isFetching">
        <UIEmptyState
          key="no-records"
          illustration="none"
          class="grid-results__span-full grid-results__empty-state"
          title="Nenhum registro encontrado."
          description="Não há registros cadastrados para exibir."
        />
      </template>

      <template
        v-if="
          query.isFetchNextPageError.value ||
          query.isFetchPreviousPageError.value
        "
      >
        <div
          class="u-flex u-items-center u-justify-between u-p-4 grid-results__span-full grid-results__error"
        >
          <p class="u-font-semibold grid-results__error-text">
            Não foi possível buscar mais conteúdo...
          </p>
          <button
            class="u-text-sm u-px-4 u-py-1 grid-results__retry-button"
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

<style scoped>
.grid-results__span-full {
  grid-column: 1 / -1;
}

.grid-results__empty-state {
  min-height: min-content;
  flex: 1 1 0%;
}

.grid-results__error {
  border: 1px solid #b91c1c;
  background-color: #fee2e2;
}

.grid-results__error-text {
  color: #b91c1c;
}

.grid-results__retry-button {
  border: 1px solid #b91c1c;
  color: #b91c1c;
  border-radius: var(--ui-radius-sm);
}

.grid-results__retry-button:hover {
  background-color: #fecaca;
}
</style>
