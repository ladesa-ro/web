<script generic="T = any" lang="ts" setup>
import { computed } from 'vue';
import type { GridItemSlotProps } from './grid-item-slot-props';

const { isLoading: isLoadingProps } = defineProps<{
  isLoading?: boolean;
  items?: GridItemSlotProps['item'][] | null;
}>();

defineSlots<{
  item(props: GridItemSlotProps): any;
  'item-skeleton'(): any;
  default(): any;
}>();

const isLoading = computed(() => isLoadingProps ?? false);
</script>

<template>
  <div class="ui-grid">
    <template v-if="items && items.length > 0">
      <div class="ui-grid__items">
        <template v-for="item in items" :key="item.id">
          <slot name="item" v-bind="{ item, isLoading }" />
        </template>
      </div>
    </template>

    <template v-else-if="isLoading">
      <div class="ui-grid__items">
        <template v-for="item in 10" :key="item">
          <slot name="item-skeleton" />
        </template>
      </div>
    </template>

    <template v-else>
      <div key="no-results" class="ui-grid__empty">
        <h3 class="ui-grid__empty-title">Nenhum resultado encontrado.</h3>
        <p class="ui-grid__empty-text">
          Tente ajustar seus termos ou filtros de pesquisa. Às vezes, termos
          menos específicos ou consultas mais amplas podem ajudá-lo a encontrar
          o que procura.
        </p>
      </div>
    </template>

    <slot />
  </div>
</template>
