<script setup lang="ts">
import { Collapsible } from '@ladesa-ro/web.ui';

defineProps<{ disabled?: boolean }>();
const open = defineModel<boolean>({ required: false, default: false });
</script>

<template>
  <Collapsible v-model="open" v-bind="$props">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <slot />
  </Collapsible>
</template>
