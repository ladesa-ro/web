<script setup lang="ts">
export type ContainerProps = {
  variant?: 'tighter' | 'tight' | 'default' | 'large' | 'larger';
  styled?: boolean;
};

const { variant = 'default', styled = true } = defineProps<ContainerProps>();
</script>

<template>
  <div v-if="styled" class="ui-container" :class="`ui-container--${variant}`">
    <slot />
  </div>

  <template v-else>
    <slot />
  </template>
</template>
