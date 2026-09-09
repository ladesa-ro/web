<script setup lang="ts">
const smallScreenAlert = defineModel<boolean>();
const editMode = inject('editMode');
</script>

<template>
  <DialogSkeleton
    v-if="editMode"
    v-model="smallScreenAlert"
    must-hide-in-big-screen
    :close-on-click-outside="false"
  >
    <div
      class="dialog-small-screen-content u-flex u-flex-col u-justify-center u-items-center u-gap-5 u-rounded-lg u-m-5"
    >
      <h1 class="u-text-center u-font-semibold u-text-xl">Atenção!</h1>

      <UIAlert
        type="warning"
        message="A tela de seu dispositivo não tem tamanho suficiente para suportar a funcionalidade de edição de horário. Por favor, abra em um dispositivo maior para ter acesso a esta funcionalidade."
      />

      <UIButtonModalOk
        class="dialog-small-screen-ok"
        @click="editMode = false"
      />
    </div>
  </DialogSkeleton>
</template>

<style scoped>
.dialog-small-screen-content {
  max-width: 48rem;
  padding: var(--ui-space-5);
  background-color: var(--ladesa-background-color);
  border: 2px solid var(--ladesa-grey-color);
}

.dialog-small-screen-ok {
  width: max-content;
}

@media (min-width: 1024px) {
  .dialog-small-screen-content {
    padding: var(--ui-space-7);
  }
}
</style>
