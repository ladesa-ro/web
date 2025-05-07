<script setup lang="ts">
import type { Item } from './item';

type Props = { items: Item[] };
const { items } = defineProps<Props>();

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
  <div class="flex">
    <UIToggleButton
      v-for="item in items"
      :key="item.value"
      :selected="item.value === toggleValue"
      :item="item"
      @click="() => (toggleValue = item.value)"
    />
  </div>
</template>
