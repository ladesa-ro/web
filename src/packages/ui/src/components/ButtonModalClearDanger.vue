<script setup lang="ts">
import IconExclude from '../icons/Exclude.vue';
import ButtonModalBaseLayout from './ButtonModalBaseLayout.vue';

defineProps<{ text: string }>();
</script>

<template>
  <ButtonModalBaseLayout
    :text="text"
    color="var(--ladesa-red-color)"
    type="button"
    variant="small"
  >
    <IconExclude />
  </ButtonModalBaseLayout>
</template>
