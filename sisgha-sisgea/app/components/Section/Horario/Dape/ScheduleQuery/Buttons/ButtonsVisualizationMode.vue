<script setup lang="ts">
import Button from './ScheduleQueryButton.vue';

defineEmits(['toggleShowBreaks', 'activateEditMode']);
</script>

<template>
  <span class="flex gap-2.5">
    <Button text="Indisponibilidades">
      <IconsEyeOn class="w-5" />
    </Button>

    <Button text="Intervalos" @click="$emit('toggleShowBreaks')">
      <IconsEyeOn class="w-5" />
    </Button>

    <Button
      class="max-[875px]:hidden"
      text="Modo Edição"
      color="var(--ladesa-text-green-color)"
      @click="$emit('activateEditMode')"
    >
      <IconsEdit class="mb-0.5" />
    </Button>
  </span>
</template>
