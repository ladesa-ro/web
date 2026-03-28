<script lang="ts" setup>
import {
  createAndProvideContextDiariosFormGeral,
  type TurmaSelecionada,
} from './Contexto';

const $emit = defineEmits(['close']);

const contexto = createAndProvideContextDiariosFormGeral();

const activeModal = ref<'select' | 'gerenciar' | 'vincular' | null>('select');

const fecharTudo = () => {
  contexto.disciplinaId.value = null;
  contexto.disciplinaSelecionada.value = null;
  activeModal.value = null;
  $emit('close');
};

const abrirGerenciar = () => {
  activeModal.value = 'gerenciar';
};

const voltarParaSelect = () => {
  activeModal.value = 'select';
};

const abrirVincularTurmas = () => {
  activeModal.value = 'vincular';
};

const voltarParaGerenciar = () => {
  activeModal.value = 'gerenciar';
};

const salvarTurmas = (turmas: TurmaSelecionada[]) => {
  contexto.turmasSelecionadas!.value = [
    ...(contexto.turmasSelecionadas!.value ?? []),
    ...turmas.filter(
      t =>
        !(contexto.turmasSelecionadas!.value ?? []).some(
          existing => existing.id === t.id
        )
    ),
  ];

  voltarParaGerenciar();
};
</script>

<template>
  <!-- selecionar disciplina -->
  <DialogSkeleton
    :model-value="activeModal === 'select'"
    @update:model-value="
      val => {
        if (!val) fecharTudo();
      }
    "
  >
    <SectionDiariosFormGeralDisciplinaSelect
      @close="fecharTudo"
      @next="abrirGerenciar"
    />
  </DialogSkeleton>

  <!-- gerenciar turmas da disciplina -->
  <DialogSkeleton
    :model-value="activeModal === 'gerenciar'"
    @update:model-value="
      val => {
        if (!val) fecharTudo();
      }
    "
  >
    <SectionDiariosFormGeralDisciplinaTurmas
      :disciplina="contexto.disciplinaSelecionada"
      ref="gerenciarTurmasRef"
      @close="fecharTudo"
      @back="voltarParaSelect"
      @add="abrirVincularTurmas"
    />
  </DialogSkeleton>

  <!-- vincular turmas à disciplina -->
  <DialogSkeleton
    :model-value="activeModal === 'vincular'"
    @update:model-value="
      val => {
        if (!val) fecharTudo();
      }
    "
  >
    <SectionDiariosFormGeralDisciplinaTurmasAdd
      @back="voltarParaGerenciar"
      @close="fecharTudo"
      @save-turmas="salvarTurmas"
    />
  </DialogSkeleton>
</template>
