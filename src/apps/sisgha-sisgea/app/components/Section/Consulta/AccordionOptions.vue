<script lang="ts" setup>
import type { AcceptableValue } from 'reka-ui';
import {
  AccordionOptions,
  type AccordionOptionsProps,
  type ParsedOptionItem,
} from '@ladesa-ro/web.ui';

defineProps<AccordionOptionsProps>();

const emit = defineEmits<{ 'option-selected': [item: ParsedOptionItem] }>();

const selectedOption = defineModel<AcceptableValue>({ required: true });
</script>

<template>
  <AccordionOptions
    v-model="selectedOption"
    :items="items"
    :loading="loading"
    :error="error"
    @option-selected="item => emit('option-selected', item)"
  />
</template>
