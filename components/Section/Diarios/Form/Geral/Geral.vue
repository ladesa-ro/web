<script lang="ts" setup>
const $emit = defineEmits(['close']);

const closeForm = () => {
  $emit('close');
};

const isForm2Visible = ref<boolean>(false);

const goToForm2 = () => {
  isForm2Visible.value = true;
};

const goBackToForm1 = () => {
  isForm2Visible.value = false;
};

const isFormVisible = ref<boolean>(false);

const goToForm = () => {
  isFormVisible.value = true;
};
</script>

<template>
  <template v-if="!isForm2Visible">
    <SectionDiariosFormGeral01Disciplina @close="closeForm" @next="goToForm2" />
  </template>

  <template v-if="isForm2Visible">
    <SectionDiariosFormGeral02Turmas @close="closeForm" @back="goBackToForm1" @next="goToForm" />
  </template>
</template>
