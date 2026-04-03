<script lang="ts" setup>
import {
  createAndProvideContextDiariosFormGeral,
  type TurmaSelecionada,
} from './Contexto';

const $emit = defineEmits(['close']);

const contexto = createAndProvideContextDiariosFormGeral();

type DiarioModal = 'select' | 'gerenciar' | 'vincular';
const modals = useModalManager<DiarioModal>({ initial: 'select', history: true });

const fecharTudo = () => {
  contexto.disciplinaId.value = null;
  contexto.disciplinaSelecionada.value = null;
  modals.closeAll();
  $emit('close');
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

  modals.close();
};
</script>

<template>
  <!-- selecionar disciplina -->
  <DialogManagedDialog name="select" :manager="modals" backdrop-action="close-all">
    <SectionDiariosFormGeralDisciplinaSelect
      @close="fecharTudo"
      @next="modals.open('gerenciar')"
    />
  </DialogManagedDialog>

  <!-- gerenciar turmas da disciplina -->
  <DialogManagedDialog name="gerenciar" :manager="modals" backdrop-action="close-all">
    <SectionDiariosFormGeralDisciplinaTurmas
      ref="gerenciarTurmasRef"
      :disciplina="contexto.disciplinaSelecionada"
      @close="fecharTudo"
      @back="modals.close()"
      @add="modals.open('vincular')"
    />
  </DialogManagedDialog>

  <!-- vincular turmas à disciplina -->
  <DialogManagedDialog name="vincular" :manager="modals" backdrop-action="close-all">
    <SectionDiariosFormGeralDisciplinaTurmasAdd
      @back="modals.close()"
      @close="fecharTudo"
      @save-turmas="salvarTurmas"
    />
  </DialogManagedDialog>
</template>
