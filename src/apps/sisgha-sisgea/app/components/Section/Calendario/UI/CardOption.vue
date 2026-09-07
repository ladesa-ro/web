<script lang="ts" setup>
// # IMPORT
import type { Item } from '../../../UI/Toggle/item';

// # CODE
type Props = Omit<Item, 'value'>;

const props = defineProps<Props>();
</script>

<template>
  <div
    class="card card-option u-flex u-flex-col u-justify-center u-items-center u-py-8 u-gap-6"
  >
    <div class="card-option__icon-wrap u-flex">
      <component :is="props.icon" />
    </div>
    <p>{{ props.text }}</p>
  </div>
</template>

<style scoped>
@import '@/components/UI/Card/Card.css';

.card-option {
  cursor: pointer;
  color: var(--ladesa-text-default-color);
}

.card-option__icon-wrap {
  width: 3rem;
}
</style>
