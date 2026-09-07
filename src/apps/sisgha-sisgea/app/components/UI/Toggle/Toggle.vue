<script setup lang="ts">
import { Toggle } from '@ladesa-ro/web.ui';

defineProps<InstanceType<typeof Toggle>['$props']>();
</script>

<template>
  <Toggle v-bind="$props" />
</template>
