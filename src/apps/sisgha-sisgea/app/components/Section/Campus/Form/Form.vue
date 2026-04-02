<script lang="ts" setup>
import { useField } from 'vee-validate';
import { campusSchema } from './-Helpers/schema';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const campi = useCampi();
const confirmDelete = useConfirmDelete();

const { mode, isBusy, onSubmit, onDelete } = useEntityForm({
  schema: campusSchema,
  editId: computed(() => editId),
  getQuery: campi.findOne(computed(() => editId)),
  create: async data => {
    const { endereco: { estado: _estado, ...enderecoRest }, ...rest } = data;
    await campi.create({ ...rest, endereco: enderecoRest });
  },
  update: async (id, data) => {
    const { endereco: { estado: _estado, ...enderecoRest }, ...rest } = data;
    await campi.update(id, { ...rest, endereco: enderecoRest });
  },
  remove: id => campi.remove(id),
  invalidate: campi.invalidate,
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});

const { value: estadoId } = useField<number | null>('endereco.estado.id');
const { value: cidadeId } = useField<number | null>('endereco.cidade.id');

watch(estadoId, () => {
  cidadeId.value = null;
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UIFormLayout
      :title="mode === 'manage' ? 'Editar Campus' : 'Cadastrar Campus'"
      :mode="mode"
      :is-busy="isBusy"
      :on-close="() => emit('close')"
      :on-delete="onDelete"
    >
      <VVTextField name="apelido" label="Apelido" placeholder="Ex: Campus Ji-Paraná" />
      <VVTextField name="nomeFantasia" label="Nome Fantasia" placeholder="Digite aqui" />
      <VVTextField name="razaoSocial" label="Razão Social" placeholder="Digite aqui" />
      <VVTextField name="cnpj" label="CNPJ" placeholder="00.000.000/0000-00" mask="##.###.###/####-##" />

      <h3 class="text-sm font-semibold text-ldsa-text-default mt-2">Endereço</h3>

      <VVTextField name="endereco.cep" label="CEP" placeholder="00000-000" />
      <VVTextField name="endereco.logradouro" label="Logradouro" placeholder="Digite aqui" />
      <VVTextField name="endereco.numero" label="Número" placeholder="0" type="number" />
      <VVTextField name="endereco.bairro" label="Bairro" placeholder="Digite aqui" />
      <VVTextField name="endereco.complemento" label="Complemento" placeholder="Opcional" />
      <VVTextField name="endereco.pontoReferencia" label="Ponto de Referência" placeholder="Opcional" />
      <VVAutocompleteAPIEstado name="endereco.estado.id" />
      <VVAutocompleteAPICidade name="endereco.cidade.id" :filter-estado-id="estadoId" />
    </UIFormLayout>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este campus?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
