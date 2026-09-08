<script setup lang="ts">
import IconConfirm from '../icons/Confirm.vue';
import ButtonModalBaseLayout from './ButtonModalBaseLayout.vue';

defineProps<{ text: string }>();
</script>

<template>
  <ButtonModalBaseLayout
    :text="text"
    color="var(--ladesa-green-2-color)"
    type="submit"
  >
    <IconConfirm />
  </ButtonModalBaseLayout>
</template>
