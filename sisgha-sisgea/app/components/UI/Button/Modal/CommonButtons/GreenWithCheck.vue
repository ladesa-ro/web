<script setup lang="ts">
type Props = { text: string };
defineProps<Props>();
</script>

<template>
  <UIButtonModalBaseLayout color="var(--ladesa-green-2-color)" type="submit">
    {{ text }}
    <template #icon>
      <IconsIconConfirm />
    </template>
  </UIButtonModalBaseLayout>
</template>
