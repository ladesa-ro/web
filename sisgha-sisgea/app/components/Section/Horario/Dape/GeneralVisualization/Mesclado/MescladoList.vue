<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';
import type { Item } from '~/composables/useOptionItems';

type Props = {
  items: Item[];
  searchBarValue?: string;
};

const { items: itemsProps, searchBarValue = '' } = defineProps<Props>();

const parsedItems = computed(() => {
  return getParsedItems(itemsProps);
});

const filteredItems = computed(() => {
  return filterItemsBySearch(parsedItems.value, searchBarValue);
});

const selectedCheckboxes = defineModel<AcceptableValue[]>();
</script>

<template>
  <ul class="flex flex-col max-h-60 overflow-y-auto">
    <li
      v-for="item in filteredItems"
      :key="item.value"
      class="border-t-1 border-t-ldsa-grey/50 last:border-b-1 last:border-b-ldsa-grey/50 h-max"
    >
      <UICheckbox
        truncate-text
        class="p-1.5 font-medium text-sm"
        :items="[item]"
        v-model="selectedCheckboxes"
      />
    </li>

    <span v-if="filteredItems.length === 0" class="text-ldsa-grey text-center">
      Nenhum resultado encontrado
    </span>
  </ul>
</template>
