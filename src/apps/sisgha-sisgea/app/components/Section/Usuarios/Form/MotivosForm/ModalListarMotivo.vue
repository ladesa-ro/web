<script lang="ts" setup>
import {
  ReasonsEditModal,
  type ReasonsEditModalProps,
} from '@ladesa-ro/web.ui';

defineProps<ReasonsEditModalProps>();
</script>

<template>
  <ReasonsEditModal v-bind="$props" />
</template>
