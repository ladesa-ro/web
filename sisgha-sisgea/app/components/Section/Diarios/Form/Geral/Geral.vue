<script lang="ts" setup>
import { createAndProvideContextDiariosFormGeral } from './Contexto';

const $emit = defineEmits(['close']);

createAndProvideContextDiariosFormGeral();

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
    <SectionDiariosFormGeralDisciplinaSelect
      @close="closeForm"
      @next="goToForm2"
    />
  </template>

  <!-- <template v-if="isForm2Visible && !isForm3Visible">
    <SectionDiariosFormGeralDisciplinaTurmas
      @add="goToForm3"
      @back="goBackToForm1"
      @close="closeForm"
    />
  </template>

  <template v-if="isForm3Visible">
    <SectionDiariosFormGeralDisciplinaTurmasAdd
      @back="goBackToForm2"
      @close="closeForm"
    />
  </template> -->
</template>
