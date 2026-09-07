<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';

type Props = { items: ParsedItem[]; loading?: boolean; error?: boolean };
defineProps<Props>();

defineEmits<{ 'option-selected': [item: ParsedItem] }>();

const selectedOption = defineModel<AcceptableValue>({ required: true });
</script>

<template>
  <UIRadio
    v-slot="{ item, selected }"
    v-model="selectedOption"
    class="u-flex u-items-center u-gap-2-5 accordion-options"
    :items
  >
    <button
      class="u-flex u-items-center u-justify-center u-rounded-lg u-font-medium accordion-options__button"
      :class="{ 'accordion-options__button--selected': selected }"
      @click="$emit('option-selected', item)"
    >
      {{ item.label }}
    </button>
  </UIRadio>
</template>

<style scoped>
.accordion-options {
  width: max-content;
  overflow-x: auto;
}

.accordion-options__button {
  border: 2px solid var(--ladesa-grey-color);
  padding: var(--ui-space-2-5);
  min-width: max-content;
}

@media (min-width: 640px) {
  .accordion-options__button {
    padding: var(--ui-space-3-5);
  }
}

@media (max-width: 639px) {
  .accordion-options__button {
    font-size: 0.875rem;
  }
}

.accordion-options__button--selected {
  border-color: var(--ladesa-green-2-color);
  color: var(--ladesa-text-green-color);
  background-color: rgb(from var(--ladesa-green-2-color) R G B / 10%);
}
</style>
