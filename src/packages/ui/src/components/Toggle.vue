<script setup lang="ts">
import { watchEffect } from 'vue';
import type { ToggleItem } from './toggle-item';
import ToggleButton from './ToggleButton.vue';

export type ToggleProps = { items: ToggleItem[]; disabled?: boolean };
const { items, disabled } = defineProps<ToggleProps>();

//

const toggleValue = defineModel<ToggleItem['value']>({
  required: true,
});

watchEffect(() => {
  if (toggleValue.value === undefined && items.length > 0)
    toggleValue.value = items[0]!.value;
});
</script>

<template>
  <div class="ui-toggle" :class="{ 'ui-toggle--disabled': disabled }">
    <ToggleButton
      v-for="item in items"
      :key="item.value"
      :disabled
      :selected="item.value === toggleValue"
      :item
      @click="() => !disabled && (toggleValue = item.value)"
    />
  </div>
</template>
