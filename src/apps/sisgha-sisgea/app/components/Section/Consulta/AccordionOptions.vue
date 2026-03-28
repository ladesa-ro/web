<script setup lang="ts">
import { type AcceptableValue } from 'reka-ui';

type Props = { items: ParsedItem[]; loading?: boolean; error?: boolean };
defineProps<Props>();

defineEmits(['option-selected']);

const selectedOption = defineModel<AcceptableValue>({ required: true });
</script>

<template>
  <UIRadio
    class="flex items-center gap-2.5 w-max overflow-x-auto"
    :items
    v-model="selectedOption"
    v-slot="{ item, selected }"
  >
    <button
      @click="$emit('option-selected', item)"
      class="border-2 rounded-lg flex items-center justify-center p-2.5 sm:p-3.5 max-sm:text-sm font-medium min-w-max"
      :class="
        selected
          ? 'border-ldsa-green-2 text-ldsa-text-green bg-ldsa-green-2/10'
          : 'border-ldsa-grey'
      "
    >
      {{ item.label }}
    </button>
  </UIRadio>
</template>
