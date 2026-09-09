<script lang="ts" setup>
import {
  UnavailabilityList,
  type UnavailabilityListProps,
} from '@ladesa-ro/web.ui';

defineProps<UnavailabilityListProps>();
</script>

<template>
  <UnavailabilityList v-bind="$props" />
</template>
