<script lang="ts" setup>
import { ResourceViewFieldGroup, type ResourceViewFieldGroupProps } from '@ladesa-ro/web.ui';

defineProps<ResourceViewFieldGroupProps>();
</script>

<template>
  <ResourceViewFieldGroup v-bind="$props">
    <slot />
  </ResourceViewFieldGroup>
</template>
