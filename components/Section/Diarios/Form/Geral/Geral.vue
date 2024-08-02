<script lang="ts" setup>
import { ref } from 'vue';

const $emit = defineEmits(['close']);

const isForm2Visible = ref(false);

const closeForm = () => {
  $emit('close');
};

const goToForm2 = () => {
  isForm2Visible.value = true;
};

const goBackToForm1 = () => {
  isForm2Visible.value = false;
};
</script>

<template>
  <template v-if="!isForm2Visible">
    <SectionDiariosFormGeral01Disciplina @close="closeForm" @next="goToForm2" />
  </template>

  <template v-if="isForm2Visible">
    <SectionDiariosFormGeral02Turmas @close="closeForm" @back="goBackToForm1" />
  </template>
</template>
