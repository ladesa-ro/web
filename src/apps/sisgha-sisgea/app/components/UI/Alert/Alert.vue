<script setup lang="ts">
import { Alert } from '@ladesa-ro/web.ui';

defineProps<InstanceType<typeof Alert>['$props']>();
</script>

<template>
  <Alert v-bind="$props" />
</template>
