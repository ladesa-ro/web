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
  <div class="flex flex-col max-h-64 sm:max-h-76 overflow-y-auto">
    <UICheckbox
      v-model="selectedCheckboxes"
      :items="filteredItems"
      v-slot="{ item, invertItem, selected }"
      gap="0"
    >
      <div
        class="flex items-center p-3 gap-2 border-t-1 border-t-ldsa-grey/50 font-medium"
      >
        <UICheckboxSquare @click="invertItem(item)" :item :active="selected" />

        <span class="truncate text-sm">
          {{ item.label }}
        </span>
      </div>
    </UICheckbox>

    <span v-if="filteredItems.length === 0" class="text-ldsa-grey text-center">
      Nenhum resultado encontrado
    </span>
  </div>
</template>
