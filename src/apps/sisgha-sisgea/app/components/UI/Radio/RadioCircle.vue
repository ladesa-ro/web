<script setup lang="ts">
import { RadioCircle } from '@ladesa-ro/web.ui';

defineProps<InstanceType<typeof RadioCircle>['$props']>();
</script>

<template>
  <RadioCircle v-bind="$props" />
</template>
