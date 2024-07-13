<script setup lang="ts" generic="T = any">
import { useApiBaseResourceList } from '../../../../../../integrations';
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

const { paginatedResponse, previousItems, isLoading } =
  await useApiBaseResourceList<T>(
    options.baseQueryKey,
    options.apiBaseResourceListRetriever,
    formOptions
  );

//

const reachedTheEnd = computed(() => {
  const meta = paginatedResponse.value?.meta;

  if (meta) {
    return (
      meta.totalItems > 0 &&
      meta.currentPage > 1 &&
      meta.currentPage === meta.totalPages
    );
  }

  return false;
});
</script>

<template>
  <UIGrid :isLoading="isLoading" :items="previousItems">
    <template #item="{ item, isLoading }">
      <slot name="item" v-bind="{ item, isLoading }"></slot>
    </template>

    <template #item-skeleton>
      <slot name="item-skeleton"></slot>
    </template>

    <template v-if="reachedTheEnd">
      <div>
        <v-empty-state
          title="Isso é tudo"
          text="Você chegou ao final dos resultados."
        />
      </div>
    </template>
  </UIGrid>
</template>
