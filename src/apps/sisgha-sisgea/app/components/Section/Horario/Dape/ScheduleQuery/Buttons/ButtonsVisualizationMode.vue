<script setup lang="ts">
import Button from './ScheduleQueryButton.vue';

const editMode: Ref<boolean> = inject('editMode') ?? ref(false);
const showBreaks: Ref<boolean> = inject('showBreaks') ?? ref(false);
const showIndisponibilidades = ref(true);
</script>

<template>
  <span class="flex gap-2.5" v-show="!editMode">
    <Button
      text="Indisponibilidades"
      @click="showIndisponibilidades = !showIndisponibilidades"
    >
      <IconsEyeOn v-show="showIndisponibilidades" class="w-5" />
      <IconsEyeOff v-if="!showIndisponibilidades" class="w-5" />
    </Button>

    <Button text="Intervalos" @click="showBreaks = !showBreaks">
      <IconsEyeOff v-show="showBreaks" class="w-5" />
      <IconsEyeOn v-if="!showBreaks" class="w-5" />
    </Button>

    <Button
      class="max-[875px]:hidden"
      text="Modo Edição"
      color="var(--ladesa-text-green-color)"
      @click="editMode = true"
    >
      <IconsEdit class="mb-0.5" />
    </Button>
  </span>
</template>
