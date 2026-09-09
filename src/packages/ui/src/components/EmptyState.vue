<script setup lang="ts">
import ContentStateEmpty from './ContentStateEmpty.vue';

export type EmptyStateProps = {
  title?: string;
  description?: string;
  illustration?: 'default' | 'none';
};

const { illustration = 'default' } = defineProps<EmptyStateProps>();

const slots = defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <div class="ui-empty-state">
    <ContentStateEmpty
      v-if="illustration !== 'none'"
      class="ui-empty-state__illustration"
    />

    <h3 v-if="title" class="ui-empty-state__title">{{ title }}</h3>

    <p v-if="description || slots.default" class="ui-empty-state__description">
      <slot>{{ description }}</slot>
    </p>
  </div>
</template>
