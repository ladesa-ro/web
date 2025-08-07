<script lang="ts" setup>
import { useField } from 'vee-validate';
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

const {
  composables: { useFindOneQuery },
} = useLadesaApiCrudCursos();

const { data: cursoSelecionado, query } = useFindOneQuery(cursoId);

//

const isLoading = computed(() => props.isLoading || unref(query.isLoading));

const estrategiaModalidade = computed(() => {
  if (cursoSelecionado.value) {
    const estrategiaAutomatica = verificarModalidade(
      cursoSelecionado.value.ofertaFormacao,
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
    <div class="p-4 mb-4 text-sm rounded border border-yellow-200 bg-yellow-100 text-yellow-800">
      O sistema ainda não suporta o cadastro de turmas para a modalidade
      <span class="font-semibold">"{{ cursoSelecionado.ofertaFormacao.nome }}"</span>.
    </div>
  </template>
</template>
