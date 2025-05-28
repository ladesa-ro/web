<script setup lang="ts">
import {
  RadioGroupItem as Radio,
  RadioGroupRoot as RadioGroup,
  RadioGroupIndicator as Selected,
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
      v-for="item in items"
      :key="item.value"
      class="flex items-center gap-1 mb-1.5 last:mb-0 cursor-pointer overflow-hidden"
    >
      <Radio
        :value="item.value"
        class="border-2 rounded-full h-5.5 w-5.5 flex items-center justify-center"
        :class="
          selectedRadio === item.value
            ? 'border-ldsa-green-2'
            : 'border-ldsa-grey'
        "
      >
        <Selected class="h-3.5 w-3.5 bg-ldsa-green-2 rounded-full" />
      </Radio>

      {{ item.label }}
    </label>
  </RadioGroup>
</template>
