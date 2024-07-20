<script setup lang="ts">
import { useTurmaForm } from '../../-Helpers/context';
import { verificarModalidade } from './-Helpers/verificar-modalidade';

const { values: formValues } = useTurmaForm();

const { curso: cursoSelecionado } = await useApiCursosFindOne(
  computed(() => formValues?.curso?.id)
);

const estrategiaModalidade = computed(() => {
  return (
    cursoSelecionado.value &&
    verificarModalidade(cursoSelecionado.value.modalidade)
  );
});

const FALLBACK_TO_PERIODO = true;
</script>

<template>
  <template v-if="cursoSelecionado">
    <SectionTurmasFormFieldsPeriodoSerieTurma
      v-if="estrategiaModalidade === 'serie-turma'"
    />

    <template
      v-else-if="FALLBACK_TO_PERIODO || estrategiaModalidade === 'periodo'"
    >
      <SectionTurmasFormFieldsPeriodoBruto />
    </template>

    <template v-else>
      <v-alert type="warning">
        O sistema ainda não suporta o cadastro de turmas para a modalidade
        {{ cursoSelecionado.modalidade.nome }}.
      </v-alert>
    </template>
  </template>
</template>
