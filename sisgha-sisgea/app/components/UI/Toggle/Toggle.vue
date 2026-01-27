<script setup lang="ts">
import type { Item } from './item';

type Props = { items: Item[]; disabled?: boolean };
const { items, disabled } = defineProps<Props>();

//

const toggleValue = defineModel<Item['value']>({
  required: true,
});

watchEffect(() => {
  if (toggleValue.value === undefined && items.length > 0)
    toggleValue.value = items[0]!.value;
});
</script>

<template>
  <div class="flex" :class="disabled && 'opacity-50'">
    <UIToggleButton
      :disabled
      v-for="item in items"
      :key="item.value"
      :selected="item.value === toggleValue"
      :item
      @pointerdown="() => !disabled && (toggleValue = item.value)"
    />
  </div>
</template>
