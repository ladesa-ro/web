<script setup lang="ts">
import { useField } from 'vee-validate';
import dayjs from 'dayjs';

const { value: calendarioLetivoId } = useField<string | null>(
  'calendarioLetivo.id'
);
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
      const inicio = etapa.dataInicio
        ? dayjs(etapa.dataInicio).format('DD/MM')
        : '';
      const termino = etapa.dataTermino
        ? dayjs(etapa.dataTermino).format('DD/MM')
        : '';
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
  <div class="filtros-opcionais__divider u-relative">
    <div
      class="filtros-opcionais__divider-label u-absolute u-px-1-5 u-my-0 u-text-sm u-font-semibold"
    >
      Filtros Opcionais
    </div>
  </div>

  <div class="filtros-opcionais__grid u-grid u-gap-4 u-w-full">
    <VVSelectField
      :items="etapaItems"
      :disabled="!calendarioLetivoId"
      name="etapa.id"
      label="Etapa"
      placeholder="Selecione uma etapa"
    />

    <VVAutocompleteAPIDisciplina name="disciplina.id" />

    <VVAutocompleteAPICurso name="curso.id" />

    <VVAutocompleteAPITurma name="turma.id" :filter-curso-id="cursoId" />
  </div>
</template>

<style scoped>
.filtros-opcionais__divider {
  height: var(--ui-space-2);
  border-top: 2px solid var(--ladesa-grey-color);
}

.filtros-opcionais__divider-label {
  top: -150%;
  left: var(--ui-space-5);
  width: max-content;
  background-color: var(--ladesa-background-color);
  color: var(--ladesa-grey-color);
  z-index: 2;
}

.filtros-opcionais__grid {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 1280px) {
  .filtros-opcionais__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
