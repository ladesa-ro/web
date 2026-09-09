<script lang="ts" setup>
import { computed } from 'vue';
import Checkbox from './Checkbox.vue';
import CheckboxSquare from './CheckboxSquare.vue';
import type { AcceptableValue } from 'reka-ui';
import {
  filterOptionItemsBySearch,
  getParsedOptionItems,
  type OptionItem,
} from './option-item';

export type MescladoListProps = {
  items: OptionItem[];
  searchBarValue?: string;
};

const { items: itemsProps, searchBarValue = '' } =
  defineProps<MescladoListProps>();

const parsedItems = computed(() => getParsedOptionItems(itemsProps));
const filteredItems = computed(() =>
  filterOptionItemsBySearch(parsedItems.value, searchBarValue)
);

const selectedCheckboxes = defineModel<AcceptableValue[]>();
</script>

<template>
  <div class="ui-mesclado-list u-flex u-flex-col">
    <Checkbox
      v-slot="{ item, invertItem, selected }"
      v-model="selectedCheckboxes"
      :items="filteredItems"
      gap="0"
    >
      <div
        class="ui-mesclado-list__item u-flex u-items-center u-p-3 u-gap-2 u-font-medium"
      >
        <CheckboxSquare :item :active="selected" @click="invertItem(item)" />

        <span class="u-truncate u-text-sm">
          {{ item.label }}
        </span>
      </div>
    </Checkbox>

    <span
      v-if="filteredItems.length === 0"
      class="ui-mesclado-list__empty u-text-center"
    >
      Nenhum resultado encontrado
    </span>
  </div>
</template>
