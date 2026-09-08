<script lang="ts" setup>
type Props = {
  campo: string;
  de: string;
  para: string;
};

defineProps<Props>();
</script>

<template>
  <li>
    <span class="u-font-medium">{{ campo }}:</span>
    <span class="timeline-entry__value-before u-mx-1">{{ de }}</span>
    →
    <span class="u-ml-1">{{ para }}</span>
  </li>
</template>

<style scoped>
.timeline-entry__value-before {
  text-decoration: line-through;
  color: var(--ladesa-grey-color);
}
</style>
