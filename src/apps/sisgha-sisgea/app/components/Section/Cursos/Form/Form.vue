<script lang="ts" setup>
import { useField } from 'vee-validate';
import { cursoSchema } from './-Helpers/schema';
import FormPrimary from './FormPrimary.vue';
import FormDisciplinas from './FormDisciplinas.vue';
import SelectDisciplinas from './SelectDisciplinas.vue';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const cursos = useCursos();
const confirmDelete = useConfirmDelete();

const cursoQuery = cursos.findOne(computed(() => editId));

const { mode, isBusy, isLoading, onSubmit, onDelete } = useEntityForm({
  schema: cursoSchema,
  editId: computed(() => editId),
  getQuery: cursoQuery,

  create: async data => {
    const { imagem, ...payload } = data;
    const created = await cursos.create(payload);
    if (imagem) await cursos.uploadCover(created.id, imagem);
  },

  update: async (id, data) => {
    const { imagem, ...payload } = data;
    await cursos.update(id, payload);
    if (imagem) await cursos.uploadCover(id, imagem);
  },

  remove: id => cursos.remove(id),

  invalidate: async () => {
    await cursos.invalidate();
  },

  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});

// Campo reativo para quantidadePeriodos (fallback evita undefined antes da hidratação do vee-validate)
const { value: quantidadePeriodosField } = useField<number>('quantidadePeriodos');
const { value: periodosField } = useField<typeof cursoSchema.__outputType.periodos>('periodos');
const quantidadePeriodos = computed(() => quantidadePeriodosField.value ?? 1);

// Composable de períodos/disciplinas
const periodos = useProvideCursoPeriodos(
  mode,
  quantidadePeriodos,
  cursoQuery,
);

const DURACAO_LABELS: Record<number, string> = {
  12: 'Anual',
  6: 'Semestral',
  4: 'Quadrimestral',
};

// Metadados da formação compartilhados entre painel principal e modal
const ofertasFormacoes = useOfertasFormacoes();
const { value: ofertaFormacaoId } = useField<string>('ofertaFormacao.id');
const ofertaFormacaoQuery = ofertasFormacoes.findOne(
  computed(() => ofertaFormacaoId.value || null),
);
const formacaoNome = computed(
  () => ofertaFormacaoQuery.data.value?.nome ?? '',
);
const duracaoLabel = computed(() => {
  const meses = ofertaFormacaoQuery.data.value?.duracaoPeriodoEmMeses;
  return meses ? DURACAO_LABELS[meses] ?? `${meses} meses` : '';
});
const quantidadePeriodosLabel = computed(() => {
  const meses = ofertaFormacaoQuery.data.value?.duracaoPeriodoEmMeses;

  if (meses === 12) return 'Quantidade de períodos (anos)';
  if (meses === 6) return 'Quantidade de períodos (semestres)';
  if (meses === 4) return 'Quantidade de períodos (quadrimestres)';
  if (meses) return `Quantidade de períodos (${meses} meses)`;

  return 'Quantidade de períodos';
});

watchEffect(() => {
  periodosField.value = periodos.toPeriodosPayload();
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogLayoutSideBySide
      :collapsed="periodos.isEditing.value"
      collapse-target="secondary"
      primary-label="Curso"
      secondary-label="Disciplinas"
    >
      <template #primary>
        <FormPrimary
          :mode="mode"
          :is-busy="isBusy"
          :is-loading="isLoading"
          :duracao-label="duracaoLabel"
          :quantidade-periodos-label="quantidadePeriodosLabel"
          @close="emit('close')"
          @delete="onDelete"
        />
      </template>

      <template #secondary>
        <FormDisciplinas />
      </template>
    </DialogLayoutSideBySide>

    <DialogManagedDialog
      v-if="periodos.selectedNumeroPeriodo.value != null"
      name="selectDisciplinas"
      :manager="periodos.modals"
      backdrop-action="close-self"
    >
      <SelectDisciplinas
        :numero-periodo="periodos.selectedNumeroPeriodo.value"
        :formacao-nome="formacaoNome"
        :selected-disciplina-ids="periodos.selectedDisciplinaIds.value"
        :mode="mode"
        @confirm="periodos.confirmDisciplinas"
        @back="periodos.closeSelectDisciplinas"
      />
    </DialogManagedDialog>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este curso?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
