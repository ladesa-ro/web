<script lang="ts" setup>
import {
  VVTimeRangeField,
  type VVTimeRangeFieldProps,
} from '@ladesa-ro/web.ui';

defineProps<VVTimeRangeFieldProps>();
</script>

<template>
  <VVTimeRangeField v-bind="$props" />
</template>
