<script setup lang="ts">
import { ComboboxItem, SelectItem, SelectItemText } from 'reka-ui';

export type FormOptionItemProps = {
  mode: 'autocomplete' | 'select';
  item: { value: string | number; label: string };
};

defineProps<FormOptionItemProps>();
</script>

<template>
  <ComboboxItem
    v-if="mode === 'autocomplete'"
    :value="item.value"
    class="ui-option-item"
  >
    {{ item.label }}
  </ComboboxItem>

  <SelectItem v-else :value="item.value" class="ui-option-item">
    <SelectItemText>{{ item.label }}</SelectItemText>
  </SelectItem>
</template>
