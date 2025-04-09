<script setup lang="ts">
import {
  ComboboxItem as AutocompleteItem,
  SelectItem,
  SelectItemText as Text,
} from 'reka-ui';

type Props = {
  mode: 'autocomplete' | 'select';
  value: string | number;
};

defineProps<Props>();
</script>

<template>
  <AutocompleteItem
    v-if="mode === 'autocomplete'"
    :value="value"
    class="item h-(--reka-combobox-trigger-height)"
  />

  <SelectItem
    v-else-if="mode === 'select'"
    :value="value"
    class="item h-(--reka-select-trigger-height)"
  >
    <Text>{{ value }}</Text>
  </SelectItem>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.item {
  @apply flex items-center px-3 font-medium cursor-pointer;
  @apply data-[highlighted]:bg-ldsa-green-2/10 data-[state='checked']:bg-ldsa-green-2/20;
  @apply transition-[background-color] duration-200 hover:bg-ldsa-green-2/10 focus-visible:outline-none;
}
</style>
