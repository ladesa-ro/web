<script setup lang="ts">
import { useField } from 'vee-validate';
import dayjs from 'dayjs';

const { value: calendarioLetivoId } = useField<string | null>('calendarioLetivo.id');
const { value: cursoId } = useField<string | null>('curso.id');
const { value: etapaId } = useField<string | null>('etapa.id');

const calendarioLetivo = useCalendarioLetivo();
const calendarioQuery = calendarioLetivo.findOne(calendarioLetivoId);

const etapaItems = computed(() => {
  const etapas = calendarioQuery.data.value?.etapas;
  if (!etapas?.length) return [];

  return etapas
    .slice()
    .sort((a: any, b: any) => (a.ordem ?? 0) - (b.ordem ?? 0))
    .map((etapa: any) => {
      const inicio = etapa.dataInicio ? dayjs(etapa.dataInicio).format('DD/MM') : '';
      const termino = etapa.dataTermino ? dayjs(etapa.dataTermino).format('DD/MM') : '';
      const datas = inicio && termino ? ` - ${inicio} a ${termino}` : '';
      return {
        label: `${etapa.nome}${datas}`,
        value: etapa.id,
      };
    });
});

watch(calendarioLetivoId, () => {
  etapaId.value = null;
});
</script>

<template>
  <div class="relative border-t-2 border-ldsa-grey h-2">
    <div
      class="absolute -top-3/2 left-5 w-max px-1.5 bg-ldsa-bg my-0 text-sm font-semibold text-ldsa-grey z-2"
    >
      Filtros Opcionais
    </div>
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
    <VVSelectField
      :items="etapaItems"
      :disabled="!calendarioLetivoId"
      name="etapa.id"
      label="Etapa"
      placeholder="Selecione uma etapa"
    />

    <VVAutocompleteAPIDisciplina name="disciplina.id" />

    <VVAutocompleteAPICurso name="curso.id" />

    <VVAutocompleteAPITurma
      name="turma.id"
      :filter-curso-id="cursoId"
    />
  </div>
</template>
