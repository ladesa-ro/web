<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';
import type { Item } from '~/composables/useOptionItems';

type Props = {
  items: Item[];
  searchBarValue?: string;
};

const { items: itemsProps, searchBarValue = '' } = defineProps<Props>();

const parsedItemsList = getParsedItems(itemsProps);

const filtredItems = computed(() => {
  return parsedItemsList.filter(item => item.label.includes(searchBarValue));
});

//

const selectedCheckboxes = defineModel<AcceptableValue[]>();
</script>

<template>
  <ul class="flex flex-col">
    <li
      v-for="item in filtredItems"
      :key="item.value"
      class="border-t-1 border-t-ldsa-grey/30 last:border-b-1 last:border-b-ldsa-grey/30"
    >
      <UICheckbox class="p-3" :items="[item]" v-model="selectedCheckboxes" />
    </li>

    <span v-if="filtredItems.length === 0" class="text-ldsa-grey text-center">
      Nenhum resultado encontrado
    </span>
  </ul>
</template>
