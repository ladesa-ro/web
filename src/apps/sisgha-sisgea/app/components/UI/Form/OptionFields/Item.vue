<script setup lang="ts">
import {
  ComboboxItem as AutocompleteItem,
  SelectItem,
  SelectItemText as Text,
} from 'reka-ui';

type Props = {
  mode: 'autocomplete' | 'select';
  item: { value: string | number; label: string };
};
defineProps<Props>();
</script>

<template>
  <AutocompleteItem
    v-if="mode === 'autocomplete'"
    :value="item.value"
    class="item min-h-(--reka-combobox-trigger-height) max-h-max"
  >
    {{ item.label }}
  </AutocompleteItem>

  <SelectItem
    v-else
    :value="item.value"
    class="item min-h-(--reka-select-trigger-height) max-h-max"
  >
    <Text>{{ item.label }}</Text>
  </SelectItem>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.item {
  @apply flex items-center px-3 font-medium text-sm cursor-pointer;
  @apply data-[highlighted]:bg-ldsa-green-2/10 data-[state='checked']:bg-ldsa-green-2/20 text-ldsa-text-default hover:bg-ldsa-green-2/10 focus-visible:outline-none;
}
</style>
