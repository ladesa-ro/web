<script lang="ts" setup>
import { useFormValues } from 'vee-validate';
import { FormMode } from '~/utils/constants';
import { colecaoSchema } from './-Helpers/schema';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const colecoes = useCalendarioColecao();
const confirmDelete = useConfirmDelete();

const colecaoQuery = colecoes.findOne(computed(() => editId));

function normalizePayload<T extends { campus?: { id?: string | null } | null }>(
  data: T
) {
  const { campus, ...rest } = data;
  return {
    ...rest,
    campus: campus?.id ? { id: campus.id } : null,
  };
}

const { mode, isBusy, onSubmit, onDelete } = useEntityForm({
  schema: colecaoSchema,
  editId: computed(() => editId),
  getQuery: colecaoQuery,

  create: data => colecoes.create(normalizePayload(data)),
  update: (id, data) => colecoes.update(id, normalizePayload(data)),
  remove: id => colecoes.remove(id),
  invalidate: colecoes.invalidate,
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});

const formValues = useFormValues();
const visibilidade = computed(
  () => formValues.value.visibilidade as string | undefined
);

const visibilidadeItems = [
  { label: 'Privada', value: 'PRIVADA' },
  { label: 'Campus', value: 'CAMPUS' },
  { label: 'Pública', value: 'PUBLICA' },
];

const visibilidadeHint = computed(() => {
  switch (visibilidade.value) {
    case 'CAMPUS':
      return 'Todo mundo do campus enxerga esta coleção.';
    case 'PUBLICA':
      return 'Todos na instituição enxergam esta coleção.';
    default:
      return 'Só quem recebeu acesso enxerga esta coleção.';
  }
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UIFormLayout
      :title="
        mode === FormMode.MANAGE ? 'Editar coleção' : 'Nova coleção'
      "
      :mode="mode"
      :is-busy="isBusy"
      :on-close="() => emit('close')"
      :on-delete="onDelete"
    >
      <VVTextField name="nome" label="Nome" placeholder="Digite aqui" />

      <div class="u-flex u-flex-col u-gap-1-5">
        <span class="colecoes-form__label u-font-semibold u-px-1">
          Cor
        </span>
        <VVColorPalette name="cor" />
      </div>

      <div class="u-flex u-flex-col u-gap-1">
        <SectionCalendarioColecoesSharedEnumSelectField
          name="visibilidade"
          label="Visibilidade"
          :items="visibilidadeItems"
          :required="true"
        />
        <p class="colecoes-form__hint u-text-xs u-px-1">{{ visibilidadeHint }}</p>
      </div>

      <VVAutocompleteAPICampus
        name="campus.id"
        :required="visibilidade === 'CAMPUS'"
      />
    </UIFormLayout>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta coleção? Os eventos não são apagados, só ficam sem coleção."
    @confirm="confirmDelete.onConfirm"
  />
</template>

<style scoped>
.colecoes-form__label {
  font-size: 0.813rem;
  color: var(--ladesa-grey-color);
}

.colecoes-form__hint {
  color: var(--ladesa-grey-color);
}
</style>
