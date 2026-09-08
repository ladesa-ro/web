<script lang="ts" setup>
import { ManagedDialog, type ManagedDialogProps } from '@ladesa-ro/web.ui';

defineProps<ManagedDialogProps>();
</script>

<template>
  <ManagedDialog v-bind="$props">
    <slot />
  </ManagedDialog>
</template>
