<script lang="ts" setup>
export type ResourceViewFieldProps = {
  label: string;
  value?: string | number | null;
};

const { value } = defineProps<ResourceViewFieldProps>();
</script>

<template>
  <div class="ui-resource-view-field">
    <span class="ui-resource-view-field__label">{{ label }}</span>
    <span class="ui-resource-view-field__value">
      <slot>{{ value ?? '-' }}</slot>
    </span>
  </div>
</template>
