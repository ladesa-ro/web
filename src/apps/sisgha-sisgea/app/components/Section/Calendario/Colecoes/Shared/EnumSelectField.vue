<script lang="ts" setup>
import {
  VVEnumSelectField,
  type VVEnumSelectFieldProps,
} from '@ladesa-ro/web.ui';

defineProps<VVEnumSelectFieldProps>();
</script>

<template>
  <VVEnumSelectField v-bind="$props" />
</template>
