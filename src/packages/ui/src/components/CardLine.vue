<script lang="ts" setup>
type Props = { text?: string };
defineProps<Props>();
</script>

<template>
  <p class="ui-card-line">
    <slot>{{ text }}</slot>
  </p>
</template>
