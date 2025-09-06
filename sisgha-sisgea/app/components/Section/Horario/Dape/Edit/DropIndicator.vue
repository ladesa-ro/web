<script setup lang="ts">
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';

defineProps<{ edge: Edge; maxCapacityReached?: boolean }>();
</script>

<template>
  <div
    :class="[
      'absolute z-10 brightness-150 overflow-hidden w-full pointer-events-none',
      edge === 'top' && 'h-[1.75px]',
      edge === 'bottom' && 'h-[2px]',
      // for some reason, when maxCapacityReached is true, the red color is applied instead of green, so i toggle the order
      maxCapacityReached ? 'bg-ldsa-green-2' : 'bg-ldsa-red',
    ]"
  />
</template>
