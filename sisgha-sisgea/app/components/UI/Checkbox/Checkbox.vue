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
  truncateText?: boolean;
  disabledItems?: AcceptableValue[];
};

const {
  items: itemsProps,
  truncateText = false,
  disabledItems = [],
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
      class="flex items-center gap-1.5 cursor-pointer mb-1.5 last:mb-0 text-ldsa-text-default"
      :class="{
        'opacity-50 cursor-not-allowed': disabledItems.includes(item.value),
      }"
    >
      <Checkbox
        v-if="$slots['default']"
        :value="item.value"
        @keyup.enter="invertItem(item)"
      >
        <slot
          :item
          :selected="checkedItems.includes(item.value)"
          :disabled="disabledItems.includes(item.value)"
          :invertItem
        />
      </Checkbox>

      <UICheckboxSquare
        v-else
        :item
        :truncateText
        :active="checkedItems.includes(item.value)"
        :disabled="disabledItems.includes(item.value)"
        :enter-handle="invertItem"
      />

      <span v-else v-bind="$attrs" :class="{ truncate: truncateText }">
        {{ item.label }}
      </span>
    </label>
  </CheckboxGroupRoot>
</template>
