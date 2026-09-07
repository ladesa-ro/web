<script setup lang="ts">
import { Pagination, type PaginationProps } from '@ladesa-ro/web.ui';

defineProps<PaginationProps>();
defineEmits<{
  'update:currentPage': [page: number];
}>();
</script>

<template>
  <Pagination v-bind="$props" @update:current-page="page => $emit('update:currentPage', page)" />
</template>
