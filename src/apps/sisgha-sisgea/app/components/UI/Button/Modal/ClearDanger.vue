<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <UIButtonModalBaseLayout
    :text="text"
    color="var(--ladesa-red-color)"
    type="button"
    variant="small"
  >
    <IconsExclude />
  </UIButtonModalBaseLayout>
</template>
