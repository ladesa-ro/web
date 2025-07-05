<script setup lang="ts">
import Button from './ScheduleQueryButton.vue';
const editMode = defineModel<boolean>({ default: false });
</script>

<template>
  <span class="flex gap-2">
    <Button text="Indisponibilidades">
      <IconsEyesEyeOn class="w-5" />
    </Button>

    <Button text="Intervalos">
      <IconsEyesEyeOn class="w-5" />
    </Button>

    <Button
      text="Modo Edição"
      color="var(--ladesa-text-green-color)"
      @click="editMode = true"
    >
      <IconsIconEdit class="mb-0.5" />
    </Button>
  </span>
</template>
