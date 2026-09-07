<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';
import type { Item } from '~/composables/useOptionItems';

type Props = {
  items: Item[];
  searchBarValue?: string;
};

const { items: itemsProps, searchBarValue = '' } = defineProps<Props>();

const parsedItems = computed(() => getParsedItems(itemsProps));

// TODO: substituir por busca da API
const filteredItems = computed(() =>
  filterItemsBySearch(parsedItems.value, searchBarValue)
);

const selectedCheckboxes = defineModel<AcceptableValue[]>();
</script>

<template>
  <div class="mesclado-list u-flex u-flex-col">
    <UICheckbox
      v-slot="{ item, invertItem, selected }"
      v-model="selectedCheckboxes"
      :items="filteredItems"
      gap="0"
    >
      <div
        class="mesclado-list__item u-flex u-items-center u-p-3 u-gap-2 u-font-medium"
      >
        <UICheckboxSquare :item :active="selected" @click="invertItem(item)" />

        <span class="u-truncate u-text-sm">
          {{ item.label }}
        </span>
      </div>
    </UICheckbox>

    <span
      v-if="filteredItems.length === 0"
      class="mesclado-list__empty u-text-center"
    >
      Nenhum resultado encontrado
    </span>
  </div>
</template>

<style scoped>
.mesclado-list {
  max-height: 16rem;
  overflow-y: auto;
}

.mesclado-list__item {
  border-top: 1px solid rgb(from var(--ladesa-grey-color) R G B / 50%);
}

.mesclado-list__empty {
  color: var(--ladesa-grey-color);
}

@media (min-width: 640px) {
  .mesclado-list {
    max-height: 19rem;
  }
}
</style>
