<script lang="ts" setup>
import { SelectItem, SelectItemText as Text } from 'radix-vue';

type Props = {
  value: any;
};
const { value } = defineProps<Props>();
</script>

<template>
  <SelectItem
    :class="[
      'flex items-center h-(--radix-select-trigger-height) px-3 font-medium cursor-pointer',
      'transition-[background-color] duration-[200ms] hover:bg-ldsa-green-2/10',
    ]"
    :value="value"
  >
    <Text> {{ value }}</Text>
  </SelectItem>
</template>
