<script setup lang="ts">
export type BadgeVariant =
  | 'neutral'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

export type BadgeProps = {
  variant?: BadgeVariant;
  text?: string;
};

const { variant = 'neutral' } = defineProps<BadgeProps>();
</script>

<template>
  <span class="ui-badge" :class="`ui-badge--${variant}`">
    <slot>{{ text }}</slot>
  </span>
</template>
