<script lang="ts" setup>
import type { Component } from 'vue';

defineProps<{
  icon: Component;
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="u-flex u-items-center u-justify-center guard-message">
    <div class="u-flex u-flex-col u-items-center u-gap-4 u-text-center guard-message__box">
      <component :is="icon" class="guard-message__icon" />

      <h2 class="u-text-lg u-font-semibold guard-message__title">
        {{ title }}
      </h2>

      <p class="u-text-sm guard-message__description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.guard-message {
  padding-block: 4rem;
  padding-inline: var(--ui-space-4);
}

.guard-message__box {
  max-width: 24rem;
}

.guard-message__icon {
  width: 3rem;
  height: 3rem;
  color: var(--ladesa-grey-color);
}

.guard-message__title {
  color: var(--ladesa-text-default-color);
}

.guard-message__description {
  color: var(--ladesa-grey-color);
  line-height: 1.625;
}
</style>
