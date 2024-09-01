<script setup lang="ts">
import { ref } from 'vue';

const $emit = defineEmits(['close']);

const isForm2Visible = ref(false);
const isForm3Visible = ref(false);

const closeForm = () => {
  $emit('close');
};

const goToForm2 = () => {
  isForm2Visible.value = true;
};

const goBackToForm1 = () => {
  isForm2Visible.value = false;
};

const goToForm3 = () => {
  isForm3Visible.value = true;
};

const goBackToForm2 = () => {
  isForm3Visible.value = false;
};
</script>


<template>
  <template v-if="!isForm2Visible && !isForm3Visible">
    <SectionDiariosFormGeral01Disciplina @close="closeForm" @next="goToForm2" />
  </template>

  <template v-if="isForm2Visible && !isForm3Visible">
    <SectionDiariosFormGeral02Turmas @close="closeForm" @back="goBackToForm1" @add="goToForm3" />
  </template>

  <template v-if="isForm3Visible">
    <SectionDiariosFormGeral02Turmas03Turmas @close="closeForm" @back="goBackToForm2" />
  </template>
</template>

