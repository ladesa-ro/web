<script setup lang="ts">
import type { ToggleItem } from './toggle-item';

export type ToggleButtonProps = {
  item: ToggleItem;
  selected: boolean;
};

defineProps<ToggleButtonProps>();
</script>

<template>
  <button
    class="ui-toggle-button"
    :class="{ 'ui-toggle-button--selected': selected }"
  >
    <p class="ui-toggle-button__label">{{ item.text }}</p>
    <component :is="item.icon" class="ui-toggle-button__icon" />
  </button>
</template>
