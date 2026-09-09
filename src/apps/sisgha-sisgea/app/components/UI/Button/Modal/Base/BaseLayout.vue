<script setup lang="ts">
import {
  ButtonModalBaseLayout,
  type ButtonModalBaseLayoutProps,
} from '@ladesa-ro/web.ui';

defineProps<ButtonModalBaseLayoutProps>();
</script>

<template>
  <ButtonModalBaseLayout v-bind="$props">
    <slot />
  </ButtonModalBaseLayout>
</template>
