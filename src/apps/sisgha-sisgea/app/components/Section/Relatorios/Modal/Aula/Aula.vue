<script lang="ts" setup>
import { ReportLesson, type ReportLessonProps } from '@ladesa-ro/web.ui';

defineProps<ReportLessonProps>();
</script>

<template>
  <ReportLesson v-bind="$props" />
</template>
