<script setup lang="ts">
import { useField } from 'vee-validate';
import { QuerySuspenseBehaviourMode } from '../../../../../../integrations';
import { verificarModalidade } from './-Helpers/verificar-modalidade';

//

const FALLBACK_TO_PERIODO = true;

//

type Props = {
  disabled?: boolean;
  isLoading?: boolean;
};

const props = defineProps<Props>();

//

const { value: cursoId } = useField<string | null>('curso.id');

const { curso: cursoSelecionado, query } = await useApiCursosFindOne(cursoId, {
  mode: QuerySuspenseBehaviourMode.NEVER_WAIT,
});

//

const isLoading = computed(() => props.isLoading || unref(query.isLoading));

const estrategiaModalidade = computed(() => {
  if (cursoSelecionado.value) {
    const estrategiaAutomatica = verificarModalidade(
      cursoSelecionado.value.modalidade,
      FALLBACK_TO_PERIODO
    );

    if (estrategiaAutomatica !== 'nao-implementado') {
      return estrategiaAutomatica;
    }
  }

  if (FALLBACK_TO_PERIODO) {
    return 'periodo';
  }

  return null;
});
</script>

<template>
  <SectionTurmasFormFieldsPeriodoSerieLetra
    v-if="estrategiaModalidade === 'serie-letra'"
    :is-loading="isLoading"
    :disabled="disabled"
  />

  <template v-else-if="estrategiaModalidade === 'periodo'">
    <SectionTurmasFormFieldsPeriodoBruto
      :is-loading="isLoading"
      :disabled="disabled"
    />
  </template>

  <template v-else-if="cursoSelecionado">
    <v-alert type="warning">
      O sistema ainda não suporta o cadastro de turmas para a modalidade
      <span>"{{ cursoSelecionado.modalidade.nome }}".</span>
    </v-alert>
  </template>
</template>
