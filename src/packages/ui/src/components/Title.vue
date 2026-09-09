<script setup lang="ts">
type Props = {
  text?: string;
  variant?: 'default' | 'small' | 'mini';
};

const { variant = 'default' } = defineProps<Props>();
</script>

<template>
  <h1 class="ui-title" :class="`ui-title--${variant}`">
    <slot>{{ text }}</slot>
  </h1>
</template>
