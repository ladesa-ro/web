<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import type { ParsedItem } from '~/composables/useOptionItems';

const ofertasFormacoes = useOfertasFormacoes();
const cursos = useCursos();
const turmas = useTurmas();

const schema = yup.object().shape({
  campusId: yup.string().uuid().required(),
  formacaoId: yup.string().uuid().required(),
  cursoId: yup.string().uuid().required(),
  turmaId: yup.string().uuid().required(),
});

const { values, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    campusId: null,
    formacaoId: null,
    cursoId: null,
    turmaId: null,
  },
});

const wrapFilter = (value: string | null) => {
  return value ? [value] : [];
};

const getFieldRef = (field: any) => {
  return defineField(field)[0];
};

const formacaoQuery = ofertasFormacoes.list();

const cursoQuery = cursos.list(computed(() => ({
  filterCampusId: wrapFilter(values.campusId),
  filterOfertaFormacaoId: wrapFilter(values.formacaoId),
})));

const turmaQuery = turmas.list(computed(() => ({
  filterCursoId: wrapFilter(values.cursoId),
})));

type SelectionData = {
  field: string;
  name: string;

  query: { data: Ref<any>; isEnabled: Ref<boolean>; isError: Ref<boolean>; isLoading: Ref<boolean>; isFetching: Ref<boolean> };
  open: Ref<boolean>;
  value: Ref<string | null>;

  items: ComputedRef<ParsedItem[]>;
};

const selectionDatas: SelectionData[] = ([
  {
    field: 'formacaoId',
    name: 'Formação',

    open: ref(false),
    query: formacaoQuery,
    value: getFieldRef('formacaoId'),

    items: computed(() => {
      if (!formacaoQuery.isEnabled?.value) return [];

      const ofertaFormacoes = formacaoQuery.data?.value?.data;
      if (!ofertaFormacoes) return [];

      return ofertaFormacoes.map(ofertaFormacao => ({
        value: ofertaFormacao.id,
        label: ofertaFormacao.nome,
      }));
    }),
  },
  {
    name: 'Curso',

    field: 'cursoId',
    query: cursoQuery,
    open: ref(false),
    value: getFieldRef('cursoId'),

    items: computed(() => {
      if (!cursoQuery.isEnabled?.value) return [];

      const cursos = cursoQuery.data?.value?.data;
      if (!cursos) return [];

      return cursos.map(curso => ({
        value: curso.id,
        label: curso.nome,
      }));
    }),
  },
  {
    name: 'Turma',

    field: 'turmaId',
    query: turmaQuery,
    open: ref(false),
    value: getFieldRef('turmaId'),

    items: computed(() => {
      if (!turmaQuery.isEnabled?.value) return [];

      const turmas = turmaQuery.data?.value?.data;
      if (!turmas) return [];

      return turmas.map(turma => ({
        value: turma.id,
        label: turma.periodo,
      }));
    }),
  },
]);

const allHaveSelected = computed(() => {
  return values.campusId !== null && values.formacaoId !== null && values.cursoId !== null && values.turmaId !== null;
});

for (const selectionData of selectionDatas) {
  watch(
    [
      () => selectionData.query.isEnabled.value,
      () => selectionData.items.value,
    ],
    ([isEnabled, items]) => {
      if (!isEnabled) {
        selectionData.value.value = null;
        selectionData.open.value = false;
      } else {
        if (selectionData.value.value === null) {
          selectionData.open.value = true;
        }

        if (items.length === 0) {
          selectionData.value.value = null;
        }
      }
    },
  );
}
</script>

<template>
  <VVAutocompleteAPICampus name="campusId" />

  <SectionConsultaAccordion
    v-for="item in selectionDatas"
    :key="item.field"

    :open="item.open.value"
    @update:open="value => item.open.value = value"

    :selected-option="item.value.value"
    @update:selected-option="value => item.value.value = value"

    :title="item.name"
    :items="item.items.value"

    :disabled="!item.query.isEnabled.value"
    :error="item.query.isError.value"
    :loading="item.query.isLoading.value || item.query.isFetching.value"
  />

  <!-- if all items are selected, send to the schedule of the selected turma  -->
  <NuxtLink
    :to="`/sisgha/consulta/horario/${values.turmaId}`"
    class="w-full"
  >
    <UIButtonDefault :disabled="!allHaveSelected" class="w-full">
      Ver horário
    </UIButtonDefault>
  </NuxtLink>
</template>
