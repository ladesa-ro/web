<script setup lang="ts">
import Button from './ScheduleQueryButton.vue';

const editMode: Ref<boolean> = inject('editMode') ?? ref(false);
const showBreaks: Ref<boolean> = inject('showBreaks') ?? ref(false);
const showIndisponibilidades = ref(true);
</script>

<template>
  <span v-show="!editMode" class="u-flex u-gap-2-5">
    <Button
      text="Indisponibilidades"
      @click="showIndisponibilidades = !showIndisponibilidades"
    >
      <IconsEyeOn
        v-show="showIndisponibilidades"
        class="buttons-visualization-mode__icon"
      />
      <IconsEyeOff
        v-if="!showIndisponibilidades"
        class="buttons-visualization-mode__icon"
      />
    </Button>

    <Button text="Intervalos" @click="showBreaks = !showBreaks">
      <IconsEyeOff
        v-show="showBreaks"
        class="buttons-visualization-mode__icon"
      />
      <IconsEyeOn v-if="!showBreaks" class="buttons-visualization-mode__icon" />
    </Button>

    <Button
      class="buttons-visualization-mode__edit-button"
      text="Modo Edição"
      color="var(--ladesa-text-green-color)"
      @click="editMode = true"
    >
      <IconsEdit class="buttons-visualization-mode__edit-icon" />
    </Button>
  </span>
</template>

<style scoped>
.buttons-visualization-mode__icon {
  width: 1.25rem;
}

.buttons-visualization-mode__edit-icon {
  margin-bottom: 0.125rem;
}

@media (max-width: 875px) {
  .buttons-visualization-mode__edit-button {
    display: none;
  }
}
</style>
