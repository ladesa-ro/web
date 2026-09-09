<script setup lang="ts">
import { Popover, type PopoverProps } from '@ladesa-ro/web.ui';

const { arrow, disabled, disableAnimation } = defineProps<PopoverProps>();
const open = defineModel({ required: false, default: false });
</script>

<template>
  <Popover
    v-model="open"
    :arrow="arrow"
    :disabled="disabled"
    :disable-animation="disableAnimation"
  >
    <template #activator>
      <slot name="activator" />
    </template>
    <slot />
  </Popover>
</template>
