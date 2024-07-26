<script setup lang="ts">
import { useTurmaFormValues } from '../../-Helpers/context';
import { QuerySuspenseBehaviourMode } from '../../../../../../integrations';
import { verificarModalidade } from './-Helpers/verificar-modalidade';

type Props = {
  disabled?: boolean;
  isLoading?: boolean;
};

const props = defineProps<Props>();

const formValues = useTurmaFormValues();

const { curso: cursoSelecionado, query } = await useApiCursosFindOne(
  computed(() => formValues.value.curso?.id),
  {
    mode: QuerySuspenseBehaviourMode.NEVER_WAIT,
  }
);

const isLoading = computed(() => props.isLoading || unref(query.isLoading));

const estrategiaModalidade = computed(() => {
  return (
    cursoSelecionado.value &&
    verificarModalidade(cursoSelecionado.value.modalidade)
  );
});

const FALLBACK_TO_PERIODO = true;
</script>

<template>
  <SectionTurmasFormFieldsPeriodoSerieTurma
    v-if="cursoSelecionado && estrategiaModalidade === 'serie-turma'"
    :is-loading="isLoading"
    :disabled="disabled"
  />

  <template
    v-else-if="FALLBACK_TO_PERIODO || estrategiaModalidade === 'periodo'"
  >
    <SectionTurmasFormFieldsPeriodoBruto
      :is-loading="isLoading"
      :disabled="disabled"
    />
  </template>

  <template v-else-if="cursoSelecionado">
    <v-alert type="warning">
      O sistema ainda não suporta o cadastro de turmas para a modalidade
      {{ cursoSelecionado.modalidade.nome }}.
    </v-alert>
  </template>
</template>
