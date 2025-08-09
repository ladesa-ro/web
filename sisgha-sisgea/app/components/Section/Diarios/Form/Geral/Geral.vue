<script lang="ts" setup>
import { ref } from 'vue';
import { createAndProvideContextDiariosFormGeral } from './Contexto';

const $emit = defineEmits(['close']);

createAndProvideContextDiariosFormGeral();

const isManageClassesVisible = ref(false);
const isLinkClassesVisible = ref(false);

const closeAll = () => {
  $emit('close');
};

const goToManageClasses = () => {
  isManageClassesVisible.value = true;
};

const backToDisciplineSelect = () => {
  isManageClassesVisible.value = false;
};

const goToLinkClasses = () => {
  isLinkClassesVisible.value = true;
};

const backToManageClasses = () => {
  isLinkClassesVisible.value = false;
};
</script>

<template>
  <!-- selecionar disciplina -->
  <template v-if="!isManageClassesVisible && !isLinkClassesVisible">
    <SectionDiariosFormGeralDisciplinaSelect
      @close="closeAll"
      @next="goToManageClasses"
    />
  </template>

  <!-- gerenciar turmas da disciplina -->
  <template v-if="isManageClassesVisible && !isLinkClassesVisible">
    <SectionDiariosFormGeralDisciplinaTurmas
      @back="backToDisciplineSelect"
      @add="goToLinkClasses"
      @close="closeAll"
    />
  </template>

  <!-- vincular turmas à disciplina -->
  <template v-if="isLinkClassesVisible">
    <SectionDiariosFormGeralDisciplinaTurmasAdd
      @back="backToManageClasses"
      @close="closeAll"
    />
  </template>
</template>
