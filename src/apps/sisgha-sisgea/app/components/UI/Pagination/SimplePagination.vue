<script setup lang="ts">
import { Pagination } from '@ladesa-ro/web.ui';

defineProps<InstanceType<typeof Pagination>['$props']>();
</script>

<template>
  <Pagination v-bind="$props" />
</template>
