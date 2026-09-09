<script setup lang="ts">
import { EmptyState, type EmptyStateProps } from '@ladesa-ro/web.ui';

defineProps<EmptyStateProps>();
</script>

<template>
  <EmptyState v-bind="$props">
    <slot />
  </EmptyState>
</template>
