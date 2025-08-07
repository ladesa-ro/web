<script setup lang="ts">
import {
  RadioGroupItem as Radio,
  RadioGroupRoot as RadioGroup,
  type AcceptableValue,
} from 'reka-ui';
import { getParsedItems, type Item } from '~/composables/useOptionItems';

type Props = { items: Item[] };
const { items: itemsProps } = defineProps<Props>();

const items = getParsedItems(itemsProps);

//

const selectedRadio = defineModel<AcceptableValue>({ default: null });
</script>

<template>
  <RadioGroup v-model="selectedRadio">
    <label
      v-bind="$attrs"
      v-for="item in items"
      :key="item.value"
      class="flex items-center gap-1 mb-2 last:mb-0 cursor-pointer overflow-hidden"
    >
      <Radio v-if="$slots['default']" :value="item.value" class="w-full">
        <slot :item="item" :isThisItemSelected="item.value === selectedRadio" />
      </Radio>

      <template v-else>
        <UIRadioCircle
          :itemValue="item.value"
          :isSelected="selectedRadio === item.value"
        />

        {{ item.label }}
      </template>
    </label>
  </RadioGroup>
</template>
