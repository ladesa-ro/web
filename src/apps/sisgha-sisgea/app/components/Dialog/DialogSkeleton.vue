<script lang="ts" setup>
import { DialogSkeleton, type DialogSkeletonProps } from '@ladesa-ro/web.ui';

withDefaults(defineProps<DialogSkeletonProps>(), {
  closeOnClickOutside: true,
});

const isActive = defineModel<boolean>({ default: false });
</script>

<template>
  <DialogSkeleton v-model="isActive" v-bind="$props">
    <template v-if="$slots.activator" #activator>
      <slot name="activator" />
    </template>

    <slot />
  </DialogSkeleton>
</template>
