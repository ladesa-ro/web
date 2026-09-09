<script lang="ts" setup>
import type { Component } from 'vue';

export type GuardMessageProps = {
  icon: Component;
  title: string;
  description: string;
};

defineProps<GuardMessageProps>();
</script>

<template>
  <div class="ui-guard-message u-flex u-items-center u-justify-center">
    <div
      class="ui-guard-message__box u-flex u-flex-col u-items-center u-gap-4 u-text-center"
    >
      <component :is="icon" class="ui-guard-message__icon" />

      <h2 class="ui-guard-message__title u-text-lg u-font-semibold">
        {{ title }}
      </h2>

      <p class="ui-guard-message__description u-text-sm">{{ description }}</p>
    </div>
  </div>
</template>
