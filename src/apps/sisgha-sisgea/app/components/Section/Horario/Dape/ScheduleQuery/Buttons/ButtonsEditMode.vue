<script setup lang="ts">
import Button from './ScheduleQueryButton.vue';

const editMode: Ref<boolean> = inject('editMode') ?? ref(false);
const showBreaks: Ref<boolean> = inject('showBreaks') ?? ref(false);
</script>

<template>
  <span v-if="editMode" class="u-flex u-gap-2-5">
    <slot />

    <Button text="Intervalos" @click="showBreaks = !showBreaks">
      <IconsEyeOff v-show="showBreaks" class="buttons-edit-mode__icon" />
      <IconsEyeOn v-if="!showBreaks" class="buttons-edit-mode__icon" />
    </Button>

    <div class="divider" />

    <Button color="var(--ladesa-red-color)" @click="editMode = false">
      <IconsClose class="buttons-edit-mode__icon--close" />
    </Button>

    <Button color="var(--ladesa-text-green-color)" @click="editMode = false">
      <IconsConfirm class="buttons-edit-mode__icon" />
    </Button>
  </span>
</template>

<style scoped>
.divider {
  height: 100%;
  min-height: var(--ui-space-10);
  width: 0.125rem;
  margin-inline: var(--ui-space-2-5);
  background-color: rgb(from var(--ladesa-grey-color) R G B / 40%);
}

.buttons-edit-mode__icon {
  width: 1.25rem;
}

.buttons-edit-mode__icon--close {
  width: 1rem;
}

.buttons-edit-mode__icon--broom {
  width: 1.125rem;
}
</style>
