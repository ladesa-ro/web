<script lang="ts" setup>
export type ResourceViewFieldGroupProps = {
  columns?: 1 | 2 | 3;
};

const { columns = 2 } = defineProps<ResourceViewFieldGroupProps>();
</script>

<template>
  <section
    class="ui-resource-view-field-group"
    :class="columns > 1 && `ui-resource-view-field-group--columns-${columns}`"
  >
    <slot />
  </section>
</template>
