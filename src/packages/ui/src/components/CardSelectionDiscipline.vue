<script lang="ts" setup>
type Props = {
  text?: string;
};

defineProps<Props>();
</script>

<template>
  <p class="ui-card-selection-discipline__text">
    <slot>{{ text }}</slot>
  </p>
</template>
