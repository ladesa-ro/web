<script lang="ts" setup generic="T extends AcceptableValue">
import { AccordionSelect, type AccordionSelectProps } from '@ladesa-ro/web.ui';
import type { AcceptableValue } from 'reka-ui';

const props = defineProps<AccordionSelectProps>();

const selectedOption = defineModel<T>('selectedOption', {
  required: true,
});

const open = defineModel<boolean>('open', {
  default: false,
});
</script>

<template>
  <AccordionSelect
    v-bind="props"
    v-model:selected-option="selectedOption"
    v-model:open="open"
  />
</template>
