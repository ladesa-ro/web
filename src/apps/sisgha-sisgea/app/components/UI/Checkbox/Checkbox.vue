<script setup lang="ts">
import {
  type AcceptableValue,
  CheckboxRoot as Checkbox,
  CheckboxGroupRoot,
} from 'reka-ui';
import {
  type Item,
  type ParsedItem,
  getParsedItems,
} from '~/composables/useOptionItems';

type Props = {
  items: Item[];
  disabledItems?: AcceptableValue[];
  gap?: string;
};

const {
  items: itemsProps,
  disabledItems = [],
  gap = '0.375rem',
} = defineProps<Props>();

const items = getParsedItems(itemsProps);
const checkedItems = defineModel<AcceptableValue[]>({ default: [] });

//

const invertItem = (item: ParsedItem) => {
  if (disabledItems.includes(item.value)) return; // impede ação se estiver desabilitado

  if (checkedItems.value.includes(item.value)) {
    checkedItems.value = checkedItems.value.filter(
      value => value !== item.value
    );
  } else {
    checkedItems.value.push(item.value);
  }
};
</script>

<template>
  <CheckboxGroupRoot v-model="checkedItems">
    <label
      v-for="item in items"
      :key="item.value"
      class="flex items-center cursor-pointer last:mb-0 text-ldsa-text-default"
      :style="{ gap }"
      :class="{
        'opacity-50 cursor-not-allowed': disabledItems.includes(item.value),
      }"
    >
      <Checkbox
        class="w-full"
        v-if="$slots['default']"
        :value="item.value"
        @keyup.enter="invertItem(item)"
      >
        <slot
          :item="item"
          :selected="checkedItems.includes(item.value)"
          :disabled="disabledItems.includes(item.value)"
          :invert-item="invertItem"
        />
      </Checkbox>

      <template v-else>
        <UICheckboxSquare
          class="mb-2 last:mb-0"
          :item="item"
          :active="checkedItems.includes(item.value)"
          :disabled="disabledItems.includes(item.value)"
          :enter-handle="invertItem"
        />

        <span v-bind="$attrs">
          {{ item.label }}
        </span>
      </template>
    </label>
  </CheckboxGroupRoot>
</template>
