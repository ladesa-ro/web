<script generic="T = any" lang="ts" setup>
import { useGenericCrudInfinityListQuery } from '../../../../../../composables/integrations/generic-crud/useGenericCrudInfinityListQuery';
import { useUIApiListContext } from '../../Context/UIApiListContext';
import type { IGridItemSlotProps } from './Typings/IGridItemSlotProps';

//

type Slots = {
  item(props: IGridItemSlotProps): any;
  'item-skeleton'(props: any): any;
};

defineSlots<Slots>();

//

const { formOptions, options } = useUIApiListContext();

const {
  query,
  items,
  suspense,
  paginationMeta,
  status: { isLoading, isFetching },
} = useGenericCrudInfinityListQuery(options.crudModule)(formOptions);

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

// TODO: paginationMeta.limit ?? 3 * 6
const skeletonItemsCount = 3 * 6;

await suspense();
</script>

<template>
  <div class="flex-1">
    <v-container class="flex-1">
      <v-infinite-scroll class="ui-api-list-results-grid" @load="load">
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

        <template #loading>
          <ClientOnly>
            <v-progress-circular indeterminate />
          </ClientOnly>
        </template>

        <template #empty>
          <template v-if="!isFetching && paginationMeta.totalItems > 0">
            <div class="w-full">
              <v-empty-state>
                <template #text>
                  <div class="text-medium-emphasis text-caption">
                    <p>Você chegou ao fim dos resultados.</p>
                    <p>
                      <span>
                        Página: {{ paginationMeta.currentPage }} de
                        {{ paginationMeta.totalPages }}.
                      </span>
                      <span>{{ ' ' }}</span>
                      <span>
                        Total: {{ paginationMeta.totalItems }} registros.
                      </span>
                    </p>
                  </div>
                </template>
              </v-empty-state>
            </div>
          </template>

          <template v-else-if="!isFetching">
            <v-empty-state
              key="no-results"
              icon="mdi-magnify"
              text="Tente ajustar seus termos ou filtros de pesquisa. Às vezes, termos menos específicos ou consultas mais amplas podem ajudá-lo a encontrar o que procura."
              title="Nenhum resultado encontrado."
            />
          </template>
        </template>

        <template #error="{ props }">
          <v-alert type="error">
            <div class="d-flex justify-space-between align-center">
              Não foi possível buscar mais conteúdo...

              <v-btn
                color="white"
                size="small"
                v-bind="props"
                variant="outlined"
              >
                Tentar Novamente
              </v-btn>
            </div>
          </v-alert>
        </template>
      </v-infinite-scroll>
    </v-container>
  </div>
</template>

<style scoped src="./Grid.css"></style>
