<script lang="ts" setup>
import { ResourceView, type ResourceViewProps } from '@ladesa-ro/web.ui';

const props = defineProps<ResourceViewProps>();
</script>

<template>
  <ResourceView v-bind="props">
    <template #breadcrumb>
      <slot name="breadcrumb">
        <UIBreadcrumbDapeBreadcrumb
          :extra-segment="!props.isLoading && !props.isError ? props.title : null"
        />
      </slot>
    </template>

    <template #header-actions>
      <slot name="header-actions" />
    </template>

    <template #details>
      <slot name="details" />
    </template>

    <template #related>
      <slot name="related" />
    </template>
  </ResourceView>
</template>
