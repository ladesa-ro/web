<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useApiClient } from '~/composables';

type Props = {
  editId?: string | null;
};

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

const editIdRef = toRef(props, 'editId');

//

const $emit = defineEmits(['close']);

const apiClient = useApiClient();
const queryClient = useQueryClient();

const {
  composables: { useFindOneQuery },
} = useLadesaApiCrudAmbientes();

const { data: currentAmbiente, suspense } = useFindOneQuery(editIdRef);
await suspense();

type FormValues = {
  imagem: Blob | null | undefined;

  bloco: {
    id: string | null;
  };

  nome: string;

  descricao: string;

  codigo: string;

  capacidade: number;

  tipo: string;
};

type FormOutput = {
  imagem: Blob | null | undefined;

  bloco: {
    id: string;
  };

  nome: string;
  descricao: string;
  codigo: string;
  capacidade: number;
  tipo: string;
};

const initialFormValues = reactive({
  imagem: null,
  bloco: {
    id: currentAmbiente.value?.bloco?.id ?? null,
  },
  nome: currentAmbiente.value?.nome ?? '',
  descricao: currentAmbiente.value?.descricao ?? '',
  codigo: currentAmbiente.value?.codigo ?? '',
  capacidade: currentAmbiente.value?.capacidade ?? 0,
  tipo: currentAmbiente.value?.tipo ?? '',
});

const handleDelete = async () => {
  const id = editIdRef.value;

  if (!id) return;

  const resposta = window.confirm(
    'Você tem certeza de que deseja deletar esse ambiente?'
  );

  if (resposta) {
    await apiClient.ambientes.ambienteDeleteOneById({ id: id });
    await queryClient.invalidateQueries({ queryKey: ['ambientes'] });
    $emit('close');
  }
};

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional(),
  bloco: yup.object().shape({
    id: yup.string().required('Bloco é obrigatório!'),
  }),
  nome: yup.string().required('Nome é obrigatório!'),
  descricao: yup.string().required('Descrição é obrigatório!'),
  codigo: yup.string().required('Código é obrigatório!'),
  capacidade: yup.number().required('Capacidade é obrigatório!'),
});

const {
  resetForm,
  handleSubmit,
  setFieldValue,
  values: formValues,
} = useForm<FormValues, FormOutput>({
  validationSchema: schema,
  initialValues: initialFormValues,
});

const onSubmit = handleSubmit(async (values: FormOutput) => {
  const editId = editIdRef.value;

  const { imagem, ...data } = values;

  let id;

  if (editId === null) {
    const ambienteCriado = await apiClient.ambientes.ambienteCreate({
      requestBody: { ...data },
    });
    id = ambienteCriado.id;
  } else {
    await apiClient.ambientes.ambienteUpdateOneById({
      id: editId,
      requestBody: {
        ...data,
      },
    });

    id = editId;
  }

  //corrigdo
  if (imagem) {
    await apiClient.ambientes.ambienteSetImagemCapa({
      id: id,
      formData: {
        file: imagem,
      },
    });
  }

  await queryClient.invalidateQueries({
    queryKey: ['ambientes'],
  });

  resetForm();
  $emit('close');
}, console.error);

const nome = computed({
  get: () => formValues.nome,
  set: value => {
    formValues.nome = value;
  },
});

const descricao = computed({
  get: () => formValues.descricao,
  set: value => {
    formValues.descricao = value;
  },
});

const codigo = computed({
  get: () => formValues.codigo,
  set: value => {
    formValues.codigo = value;
  },
});

const capacidade = computed({
  get: () => formValues.capacidade,
  set: value => {
    formValues.capacidade = value;
  },
});

const tipo = computed({
  get: () => formValues.tipo,
  set: value => {
    formValues.tipo = value;
  },
});

const onClose = () => $emit('close');
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      :on-close="onClose"
      :title="editId ? 'Editar Ambiente' : 'Cadastrar Ambiente'"
    >
      <VVSelectImage name="imagem" />

      <VVAutocompleteAPIBloco :disabled="editId !== null" name="bloco.id" />

      <VVTextField
        v-model="nome"
        label="Nome"
        name="nome"
        placeholder="Digite aqui"
        type="text"
      />

      <VVTextField
        v-model="descricao"
        label="Descrição"
        name="descricao"
        placeholder="Digite aqui"
        type="text"
      />

      <VVTextField
        v-model="codigo"
        label="Código"
        name="codigo"
        placeholder="Digite aqui"
        type="text"
      />

      <VVTextField
        v-model="capacidade"
        label="Capacidade"
        name="capacidade"
        placeholder="Digite aqui"
        type="number"
      />

      <VVTextField
        v-model="tipo"
        label="Tipo"
        name="tipo"
        placeholder="Digite aqui"
        type="text"
      />

      <template #button-group>
        <UIButtonModalCancel @click="$emit('close')" />

        <UIButtonModalDelete v-if="editId" @click.prevent="handleDelete" />
        <UIButtonModalEdit v-if="editId" />
        <UIButtonModalSave v-else />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
