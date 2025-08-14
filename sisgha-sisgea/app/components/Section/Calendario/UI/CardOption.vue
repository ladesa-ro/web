<script lang="ts" setup>
// # IMPORT
import type { Item } from '../../../UI/Toggle/item';

// # CODE
type Props = Omit<Item, 'value'>;

const props = defineProps<Props>();
</script>

<template>
  <div
    class="card flex flex-col justify-center items-center p-4 py-8 gap-6 cursor-pointer text-ldsa-text-default"
  >
    <div class="flex w-[40%]">
      <component :is="props.icon" />
    </div>
    <p>{{ props.text }}</p>
  </div>
</template>

<style scoped>
@import '@/components/UI/Card/Card.css';
</style>
