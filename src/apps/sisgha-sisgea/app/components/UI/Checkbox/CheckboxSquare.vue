<script setup lang="ts">
import { CheckboxSquare } from '@ladesa-ro/web.ui';

defineProps<InstanceType<typeof CheckboxSquare>['$props']>();
</script>

<template>
  <CheckboxSquare v-bind="$props" />
</template>
