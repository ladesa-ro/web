<script setup lang="ts">
import {
  type AcceptableValue,
  CheckboxGroupRoot,
  CheckboxRoot as Checkbox,
} from 'reka-ui';
import CheckboxSquare from './CheckboxSquare.vue';
import { getParsedOptionItems, type OptionItem, type ParsedOptionItem } from './option-item';

export type CheckboxProps = {
  items: OptionItem[];
  disabledItems?: AcceptableValue[];
  gap?: string;
};

const {
  items: itemsProps,
  disabledItems = [],
  gap = '0.375rem',
} = defineProps<CheckboxProps>();

const items = getParsedOptionItems(itemsProps);
const checkedItems = defineModel<AcceptableValue[]>({ default: [] });

//

const invertItem = (item: ParsedOptionItem) => {
  if (disabledItems.includes(item.value)) return;

  if (checkedItems.value.includes(item.value)) {
    checkedItems.value = checkedItems.value.filter(value => value !== item.value);
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
      class="ui-checkbox-label"
      :style="{ gap }"
      :class="{ 'ui-checkbox-label--disabled': disabledItems.includes(item.value) }"
    >
      <Checkbox
        v-if="$slots['default']"
        class="ui-checkbox-item--full"
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
        <CheckboxSquare
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
