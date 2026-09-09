<script lang="ts" setup>
import type { Component } from 'vue';

type Props = {
  label: string;
  border: string;
  icon: Component;
};

defineProps<Props>();
</script>

<template>
  <span
    :class="[
      'role-badge u-flex u-items-center u-gap-1 u-px-2 u-py-1 u-rounded-xl u-font-semibold',
      border,
    ]"
  >
    {{ label }}
    <component :is="icon" class="role-badge__icon" />
  </span>
</template>

<style scoped>
.role-badge {
  border-width: 2px;
  border-style: solid;
  font-size: 0.6rem;
  color: var(--ladesa-text-green-color);
}

.role-badge--green {
  border-color: var(--ladesa-green-1-color);
}

.role-badge--grey {
  border-color: rgb(156, 163, 175);
}

.role-badge__icon {
  width: 0.75rem;
  height: 0.75rem;
}
</style>
