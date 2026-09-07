<script setup lang="ts">
type Props = { outlineOnClick?: boolean };
const { outlineOnClick = true } = defineProps<Props>();
</script>

<template>
  <button class="ui-button" :class="{ 'ui-button--outline': outlineOnClick }">
    <span v-if="$slots['start-icon']" class="ui-button__icon">
      <slot name="start-icon" />
    </span>

    <p class="ui-button__label">
      <slot />
    </p>

    <span v-if="$slots['end-icon']" class="ui-button__icon">
      <slot name="end-icon" />
    </span>
  </button>
</template>
