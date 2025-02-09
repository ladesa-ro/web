<script setup lang="ts">
import { SelectItem, SelectItemText as Text } from 'radix-vue';

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
      'transition-[background-color] duration-[200ms] hover:bg-ldsa-green-2/10',
    ]"
  >
    <Text> {{ value }} </Text>
  </SelectItem>
</template>
