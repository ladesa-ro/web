<script lang="ts" setup>
import { ModalBaseLayout, type ModalBaseLayoutProps } from '@ladesa-ro/web.ui';

withDefaults(defineProps<ModalBaseLayoutProps>(), { closeButton: true });
</script>

<template>
  <ModalBaseLayout v-bind="$props">
    <slot />

    <template v-if="$slots['button-group']" #button-group>
      <slot name="button-group" />
    </template>
  </ModalBaseLayout>
</template>
