<script lang="ts" setup>
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
