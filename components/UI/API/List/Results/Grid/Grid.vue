<script setup lang="ts" generic="T = any">
import { useApiBaseResourceInfinityList } from '../../../../../../integrations';
import { useUIApiListContext } from '../../Context/UIApiListContext';
import type { IGridItemSlotProps } from './Typings';

//

type Slots = {
  item(props: IGridItemSlotProps): any;
  'item-skeleton'(props: any): any;
};

const slots = defineSlots<Slots>();

//

const { formOptions, options } = useUIApiListContext();

const {
  query,
  isLoading,
  previousItems: items,
} = await useApiBaseResourceInfinityList<T>(
  options.baseQueryKey,
  options.apiBaseResourceListRetriever,
  formOptions
);

//
type InfiniteScrollSide = 'start' | 'end' | 'both';
type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error';

type LoadOptions = {
  done: (status: InfiniteScrollStatus) => void;
  side: InfiniteScrollSide;
};

const load = async ({ done, side }: LoadOptions) => {
  const suspend = () => query.suspense().catch(() => null);

  if (side === 'end') {
    if (query.isFetchingNextPage.value) {
      await suspend();
    } else {
      await suspend();
      await query.fetchNextPage().catch(() => null);
    }

    if (query.isFetchNextPageError.value) {
      done('error');
    } else if (query.hasNextPage.value) {
      done('ok');
    } else {
      done('empty');
    }
  }

  if (side === 'start') {
    if (query.isFetchingPreviousPage.value) {
      await suspend();
    } else {
      await suspend();
      await query.fetchPreviousPage().catch(() => null);
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

const lastPage = computed(() => {
  const pages = query.data.value?.pages ?? [];
  return pages[pages.length - 1] ?? null;
});

const totalItems = computed(() => {
  return lastPage.value.meta?.totalItems ?? 0;
});

const currentPage = computed(() => {
  return lastPage.value.meta?.currentPage ?? 1;
});

const totalPages = computed(() => {
  return lastPage.value.meta?.totalPages ?? 1;
});

const resultsMeta = computed(() => {
  return `Página: ${currentPage.value} de ${totalPages.value}. Total: ${totalItems.value} registros. `;
});
</script>

<template>
  <div class="flex-1">
    <v-container key="items">
      <v-infinite-scroll
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        :onLoad="load"
      >
        <template v-for="item in items" :key="item.id">
          <div class="item">
            <slot name="item" v-bind="{ item, isLoading }"></slot>
          </div>
        </template>

        <template #empty>
          <v-empty-state>
            <template v-slot:text>
              <div class="text-medium-emphasis text-caption">
                <p>É isso, você chegou ao fim dos resultados.</p>
                <p>{{ resultsMeta }}</p>
              </div>
            </template>
          </v-empty-state>
        </template>

        <template v-slot:error="{ props }">
          <v-alert type="error">
            <div class="d-flex justify-space-between align-center">
              Não foi possível buscar mais conteúdo...
              <v-btn
                color="white"
                size="small"
                variant="outlined"
                v-bind="props"
              >
                Tentar Novamente
              </v-btn>
            </div>
          </v-alert>
        </template>
      </v-infinite-scroll>
    </v-container>

    <!-- <template v-else-if="isLoading">
      <v-container key="items-skeleton">
        <v-row>
          <v-col
            sm="12"
            md="6"
            lg="4"
            cols="12"
            class="px-2"
            v-for="item in 10"
            :key="item"
          >
            <slot name="item-skeleton"></slot>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <template v-else>
      <v-empty-state
        key="no-results"
        class="flex-1"
        icon="mdi-magnify"
        text="Tente ajustar seus termos ou filtros de pesquisa. Às vezes, termos menos específicos ou consultas mais amplas podem ajudá-lo a encontrar o que procura."
        title="Nenhum resultado encontrado."
      />
    </template> -->
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 1rem;
  /* grid-template-columns: repeat(3, 1fr); */
}

.grid > * {
  grid-column: 1/-1;
}

.grid .item {
  grid-column: auto;
}
</style>
