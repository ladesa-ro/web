<script setup lang="ts">
  type Props = {
    text?: string;
  };

  defineProps<Props>();
</script>

<template>
  <p class="truncate">
    <slot>{{ text }}</slot>
  </p>
</template>