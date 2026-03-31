<script lang="ts" setup>
type Props = {
  label: string;
  value?: string | number | null;
};

const { label, value } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <span class="text-sm font-medium text-ldsa-grey">{{ label }}</span>
    <span class="font-medium text-ldsa-text-default">
      <slot>{{ value ?? '-' }}</slot>
    </span>
  </div>
</template>
