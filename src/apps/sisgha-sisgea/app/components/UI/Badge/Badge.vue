<script setup lang="ts">
import { Badge, type BadgeProps } from '@ladesa-ro/web.ui';

defineProps<BadgeProps>();
</script>

<template>
  <Badge v-bind="$props">
    <slot />
  </Badge>
</template>
