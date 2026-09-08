<script lang="ts" setup>
import { GradeSelector, type GradeSelectorProps } from '@ladesa-ro/web.ui';

defineProps<GradeSelectorProps>();
</script>

<template>
  <GradeSelector v-bind="$props" />
</template>
