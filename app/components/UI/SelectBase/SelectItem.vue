<script setup lang="ts">
import { SelectItem, SelectItemText } from 'radix-vue';

type Props = {
  value: any;
};
const { value } = defineProps<Props>();
</script>

<template>
  <SelectItem
    :value="value"
    :class="[
      'flex items-center h-(--radix-select-trigger-height) px-3 font-medium cursor-pointer',
      'transition-[background-color] duration-150 hover:bg-ldsa-green-2/10',
    ]"
  >
    <SelectItemText>
      {{ value }}
    </SelectItemText>
  </SelectItem>
</template>
