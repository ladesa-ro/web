<script setup lang="ts">
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';

defineProps<{ edge: Edge }>();
</script>

<template>
  <div
    :class="[
      'absolute z-10 bg-sky-500  overflow-hidden w-full pointer-events-none',
      edge === 'top' && 'h-[1.75px]',
      edge === 'bottom' && 'h-[2px]',
    ]"
  />
</template>
