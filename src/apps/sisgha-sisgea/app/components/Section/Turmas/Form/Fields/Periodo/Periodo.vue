<script lang="ts" setup>
import { useField } from 'vee-validate';
import { verificarModalidade } from './-Helpers/verificar-modalidade';

const FALLBACK_TO_PERIODO = true;

type Props = {
  disabled?: boolean;
  isLoading?: boolean;
};

const props = defineProps<Props>();

const { value: cursoId } = useField<string | null>('curso.id');

const cursos_api = useCursos();

const cursoQuery = cursos_api.findOne(cursoId);

const cursoSelecionado = cursoQuery.data;

const isLoading = computed(
  () => props.isLoading || unref(cursoQuery.isLoading)
);

const estrategiaModalidade = computed(() => {
  if (cursoSelecionado.value) {
    const estrategiaAutomatica = verificarModalidade(
      cursoSelecionado.value.ofertaFormacao ?? null,
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
    :disabled="disabled"
    :is-loading="isLoading"
  />

  <template v-else-if="estrategiaModalidade === 'periodo'">
    <SectionTurmasFormFieldsPeriodoBruto
      :disabled="disabled"
      :is-loading="isLoading"
    />
  </template>

  <template v-else-if="cursoSelecionado">
    <div
      class="unsupported-modalidade-warning u-p-4 u-mb-4 u-text-sm u-rounded-sm"
    >
      O sistema ainda não suporta o cadastro de turmas para a modalidade
      <span class="u-font-semibold"
        >"{{ cursoSelecionado.ofertaFormacao?.nome }}"</span
      >.
    </div>
  </template>
</template>

<style scoped>
.unsupported-modalidade-warning {
  border: 1px solid #fef08a;
  background-color: #fef9c3;
  color: #854d0e;
}
</style>
