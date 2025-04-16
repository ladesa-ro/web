<script setup lang="ts">
type Props = { text: string };
defineProps<Props>();
</script>

<template>
  <UIButtonModalBaseLayout
    :text="text"
    color="var(--ladesa-green-2-color)"
    type="submit"
  >
    <IconsIconConfirm />
  </UIButtonModalBaseLayout>
</template>
