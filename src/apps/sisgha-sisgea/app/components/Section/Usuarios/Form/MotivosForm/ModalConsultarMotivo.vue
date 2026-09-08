<script lang="ts" setup>
import {
  ReasonsViewModal,
  type ReasonsViewModalProps,
} from '@ladesa-ro/web.ui';

defineProps<ReasonsViewModalProps>();
</script>

<template>
  <ReasonsViewModal v-bind="$props" />
</template>
