<script setup lang="ts">
const smallScreenAlert = defineModel<boolean>();
const editMode = inject('editMode');
</script>

<template>
  <DialogSkeleton
    v-if="editMode"
    v-model="smallScreenAlert"
    mustHideInBigScreen
    :closeOnClickOutside="false"
  >
    <div
      class="flex flex-col justify-center items-center gap-5 p-5 lg:p-7 bg-ldsa-bg border-2 border-ldsa-grey rounded-lg max-w-3xl m-5"
    >
      <h1 class="text-center font-semibold text-xl">Atenção!</h1>

      <UIAlert
        type="warning"
        message="A tela de seu dispositivo não tem tamanho suficiente para suportar a funcionalidade de edição de horário. Por favor, abra em um dispositivo maior para ter acesso a esta funcionalidade."
      />

      <UIButtonModalOk class="w-max" @click="editMode = false" />
    </div>
  </DialogSkeleton>
</template>
