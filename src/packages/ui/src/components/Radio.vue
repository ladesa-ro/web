<script setup lang="ts">
import {
  RadioGroupItem as Radio,
  RadioGroupRoot as RadioGroup,
  type AcceptableValue,
} from 'reka-ui';
import { computed } from 'vue';
import { getParsedOptionItems, type OptionItem } from './option-item';
import RadioCircle from './RadioCircle.vue';

export type RadioProps = { items: OptionItem[] };
const { items: itemsProps } = defineProps<RadioProps>();

const items = computed(() => getParsedOptionItems(itemsProps));

const selectedRadio = defineModel<AcceptableValue>({ default: null });
</script>

<template>
  <RadioGroup v-model="selectedRadio">
    <label v-for="item in items" :key="item.value" class="ui-radio-label">
      <Radio
        v-if="$slots['default']"
        :value="item.value"
        class="ui-radio-item--full"
      >
        <slot :item="item" :selected="item.value === selectedRadio" />
      </Radio>

      <template v-else>
        <RadioCircle
          :item-value="item.value"
          :is-selected="selectedRadio === item.value"
        />

        {{ item.label }}
      </template>
    </label>
  </RadioGroup>
</template>
