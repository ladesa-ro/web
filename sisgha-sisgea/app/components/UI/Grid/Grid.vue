<script generic="T = any" lang="ts" setup>
import type { IGridItemSlotProps } from '../API/List/Results/Grid/Typings/IGridItemSlotProps';

const props = defineProps<{
  isLoading?: boolean;
  items?: IGridItemSlotProps['item'][] | null;
}>();

const slots = defineSlots<{
  item(props: IGridItemSlotProps): any;
  'item-skeleton'(): any;
  default(): any;
}>();

const items = toRef(props, 'items');

const isLoading = computed(() => props.isLoading ?? false);
</script>

<template>
  <div class="flex-1">
    <template v-if="items && items.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        <template v-for="item in items" :key="item.id">
          <slot name="item" v-bind="{ item, isLoading }" />
        </template>
      </div>
    </template>

    <template v-else-if="isLoading">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        <template v-for="item in 10" :key="item">
          <slot name="item-skeleton" />
        </template>
      </div>
    </template>

    <template v-else>
      <div
        key="no-results"
        class="flex flex-1 flex-col items-center justify-center text-center p-8"
      >
        <span class="mdi mdi-magnify text-5xl mb-4"></span>
        <h3 class="text-lg font-semibold">Nenhum resultado encontrado.</h3>
        <p class="text-sm">
          Tente ajustar seus termos ou filtros de pesquisa. Às vezes, termos menos específicos ou consultas mais amplas podem ajudá-lo a encontrar o que procura.
        </p>
      </div>
    </template>

    <slot />
  </div>
</template>