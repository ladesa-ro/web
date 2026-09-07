<script lang="ts" setup>
import { ResourceViewField, type ResourceViewFieldProps } from '@ladesa-ro/web.ui';

defineProps<ResourceViewFieldProps>();
</script>

<template>
  <ResourceViewField v-bind="$props">
    <slot />
  </ResourceViewField>
</template>
