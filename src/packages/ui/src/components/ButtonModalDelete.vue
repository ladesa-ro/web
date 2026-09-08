<script setup lang="ts">
import IconExclude from '../icons/Exclude.vue';
import ButtonModalBaseLayout from './ButtonModalBaseLayout.vue';
</script>

<template>
  <ButtonModalBaseLayout
    text="Excluir"
    :opacity="85"
    color="var(--ladesa-red-color)"
    type="button"
  >
    <IconExclude />
  </ButtonModalBaseLayout>
</template>
