<script setup lang="ts">
import Button from './ScheduleQueryButton.vue';
const editMode = defineModel<boolean>('editMode', { default: false });

const showBreaks = defineModel<boolean>('showBreaks', { default: false });
</script>

<template>
  <span class="flex gap-2.5">
    <Button text="Indisponibilidades">
      <IconsEyeOn class="w-5" />
    </Button>

    <Button text="Intervalos" @click="showBreaks = !showBreaks">
      <IconsEyeOn class="w-5" />
    </Button>

    <Button
      text="Modo Edição"
      color="var(--ladesa-text-green-color)"
      @click="editMode = true"
    >
      <IconsEdit class="mb-0.5" />
    </Button>
  </span>
</template>
