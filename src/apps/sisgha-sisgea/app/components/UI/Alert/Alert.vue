<script setup lang="ts">
import { Alert, type AlertProps } from '@ladesa-ro/web.ui';

defineProps<AlertProps>();
</script>

<template>
  <Alert v-bind="$props" />
</template>
