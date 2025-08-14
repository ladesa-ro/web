<script lang="ts" setup>
import { ref } from 'vue';
import {
  createAndProvideContextDiariosFormGeral,
  useContextDiariosFormGeral,
} from './Contexto';

const $emit = defineEmits(['close']);

const contexto = createAndProvideContextDiariosFormGeral();

const showSelectModal = ref(true);
const showGerenciarModal = ref(false);
const showLinkClassesModal = ref(false);

const fecharTudo = () => {
  contexto.disciplinaId.value = null;
  contexto.disciplinaSelecionada.value = null;
  showSelectModal.value = false;
  showGerenciarModal.value = false;
  showLinkClassesModal.value = false;
  $emit('close');
};

const abrirGerenciar = () => {
  showSelectModal.value = false;
  showGerenciarModal.value = true;
};

const voltarParaSelect = () => {
  showGerenciarModal.value = false;
  showSelectModal.value = true;
};

const abrirVincularTurmas = () => {
  showGerenciarModal.value = false;
  showLinkClassesModal.value = true;
};

const voltarParaGerenciar = () => {
  showLinkClassesModal.value = false;
  showGerenciarModal.value = true;
};
</script>

<template>
  <!-- selecionar disciplina -->
  <SectionDiariosFormGeralDisciplinaSelect
    v-if="showSelectModal"
    @close="fecharTudo"
    @next="abrirGerenciar"
  />

  <!-- gerenciar turmas da disciplina -->
  <SectionDiariosFormGeralDisciplinaTurmas
    v-if="showGerenciarModal"
    :disciplina="contexto.disciplinaSelecionada"
    @close="fecharTudo"
    @back="voltarParaSelect"
    @add="abrirVincularTurmas"
  />

  <!-- vincular turmas à disciplina -->
  <SectionDiariosFormGeralDisciplinaTurmasAdd
    v-if="showLinkClassesModal"
    @back="voltarParaGerenciar"
    @close="fecharTudo"
  />
</template>
