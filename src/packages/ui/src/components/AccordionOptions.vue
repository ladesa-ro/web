<script lang="ts" setup>
import type { AcceptableValue } from 'reka-ui';
import Radio from './Radio.vue';
import type { ParsedOptionItem } from './option-item';

export type AccordionOptionsProps = {
  items: ParsedOptionItem[];
  loading?: boolean;
  error?: boolean;
};

defineProps<AccordionOptionsProps>();

defineEmits<{ 'option-selected': [item: ParsedOptionItem] }>();

const selectedOption = defineModel<AcceptableValue>({ required: true });
</script>

<template>
  <Radio
    v-slot="{ item, selected }"
    v-model="selectedOption"
    class="ui-accordion-options u-flex u-items-center u-gap-2-5"
    :items="items"
  >
    <button
      type="button"
      class="ui-accordion-options__button u-flex u-items-center u-justify-center u-rounded-lg u-font-medium"
      :class="{ 'ui-accordion-options__button--selected': selected }"
      @click="$emit('option-selected', item)"
    >
      {{ item.label }}
    </button>
  </Radio>
</template>
