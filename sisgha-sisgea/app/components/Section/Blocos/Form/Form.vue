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

const $emit = defineEmits(['close']);

const apiClient = useApiClient();
const queryClient = useQueryClient();

const {
  composables: { useFindOneQuery },
} = useLadesaApiCrudBlocos();

const { data: currentBloco, suspense } = useFindOneQuery(editIdRef);
await suspense();

type FormValues = {
  imagem: Blob | null | undefined;

  campus: {
    id: string | null;
  };

  nome: string;

  codigo: string;
};

type FormOutput = {
  imagem: Blob | null | undefined;

  campus: {
    id: string;
  };

  nome: string;

  codigo: string;
};

const initialFormValues = reactive({
  imagem: null,
  campus: {
    id: currentBloco.value?.campus?.id ?? null,
  },
  nome: currentBloco.value?.nome ?? '',
  codigo: currentBloco.value?.codigo ?? '',
});

const handleDelete = async () => {
  const id = editIdRef.value;

  if (!id) return;

  const resposta = window.confirm(
    'Você tem certeza de que deseja deletar esse bloco?'
  );

  if (resposta) {
    await apiClient.blocos.blocoDeleteOneById({ id: id });
    await queryClient.invalidateQueries({ queryKey: ['blocos'] });
    $emit('close');
  }
};

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional(),

  campus: yup.object().shape({
    id: yup.string().required('Campus é obrigatório!'),
  }),

  nome: yup.string().required('Nome do bloco é obrigatório!'),

  codigo: yup.string().required('Código é obrigatório!'),
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
    const blocoCriado = await apiClient.blocos.blocoCreate({
      requestBody: { ...data },
    });
    id = blocoCriado.id;
  } else {
    await apiClient.blocos.blocoUpdateOneById({
      id: editId,

      requestBody: {
        ...values,
      },
    });

    id = editId;
  }

  if (imagem) {
    await apiClient.blocos.blocoSetImagemCapa({
      id: id,
      formData: {
        file: imagem,
      },
    });
  }

  await queryClient.invalidateQueries({
    queryKey: ['blocos'],
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

const codigo = computed({
  get: () => formValues.codigo,
  set: value => {
    formValues.codigo = value;
  },
});

const onClose = () => $emit('close');
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      :on-close="onClose"
      :title="editId ? 'Editar Bloco' : 'Cadastrar Bloco'"
    >
      <VVSelectImage name="imagem" />

      <VVAutocompleteAPICampus :disabled="Boolean(editId)" name="campus.id" />

      <VVTextField
        v-model="nome"
        label="Nome"
        name="nome"
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

      <template #button-group>
        <UIButtonModalCancel @click="onClose" />

        <UIButtonModalDelete v-if="editId" @click.prevent="handleDelete" />

        <UIButtonModalEdit v-if="editId" />
        <UIButtonModalSave v-else />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
