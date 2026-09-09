<script lang="ts" setup>
import {
  UnavailabilityGrid,
  type UnavailabilityGridProps,
} from '@ladesa-ro/web.ui';

defineProps<UnavailabilityGridProps>();
</script>

<template>
  <UnavailabilityGrid v-bind="$props" />
</template>
