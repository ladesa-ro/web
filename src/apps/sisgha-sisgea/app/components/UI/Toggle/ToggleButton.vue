<script setup lang="ts">
import { ToggleButton } from '@ladesa-ro/web.ui';

defineProps<InstanceType<typeof ToggleButton>['$props']>();
</script>

<template>
  <ToggleButton v-bind="$props" />
</template>
