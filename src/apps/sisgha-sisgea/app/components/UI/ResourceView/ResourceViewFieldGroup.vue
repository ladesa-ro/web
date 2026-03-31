<script lang="ts" setup>
type Props = {
  columns?: 1 | 2 | 3;
};

const { columns = 2 } = defineProps<Props>();

const gridClass = computed(() => {
  switch (columns) {
    case 1:
      return 'grid-cols-1';
    case 3:
      return 'md:grid-cols-3';
    default:
      return 'md:grid-cols-2';
  }
});
</script>

<template>
  <section class="grid gap-4 md:gap-6" :class="gridClass">
    <slot />
  </section>
</template>
