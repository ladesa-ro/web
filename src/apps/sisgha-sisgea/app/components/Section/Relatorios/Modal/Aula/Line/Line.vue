<script lang="ts" setup>
import { ReportLine, type ReportLineProps } from '@ladesa-ro/web.ui';

defineProps<ReportLineProps>();
</script>

<template>
  <ReportLine v-bind="$props" />
</template>
