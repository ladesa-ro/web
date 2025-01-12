<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useApiAmbienteFindOne, useApiClient } from '~/composables';

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

const { ambiente: currentAmbiente } = await useApiAmbienteFindOne(editIdRef);

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
  set: (value) => {
    formValues.nome = value;
  },
});

const descricao = computed({
  get: () => formValues.descricao,
  set: (value) => {
    formValues.descricao = value;
  },
});

const codigo = computed({
  get: () => formValues.codigo,
  set: (value) => {
    formValues.codigo = value;
  },
});

const capacidade = computed({
  get: () => formValues.capacidade,
  set: (value) => {
    formValues.capacidade = value;
  },
});

const tipo = computed({
  get: () => formValues.tipo,
  set: (value) => {
    formValues.tipo = value;
  },
});
</script>

<template>
  <v-form class="form" @submit.prevent="onSubmit">
    <div class="form-header">
      <h1 class="main-title">
        <span v-if="editId">Editar Ambiente</span>
        <span v-else>Cadastrar Novo Ambiente</span>
      </h1>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <VVSelectImage name="imagem" />

      <VVAutocompleteAPIBloco name="bloco.id" :disabled="editId !== null" />

      <VVTextField
        v-model="nome"
        type="text"
        label="Nome"
        placeholder="Digite aqui"
        name="nome"
      />

      <VVTextField
        v-model="descricao"
        type="text"
        label="Descrição"
        placeholder="Digite aqui"
        name="descricao"
      />

      <VVTextField
        v-model="codigo"
        type="text"
        label="Código"
        placeholder="Digite aqui"
        name="codigo"
      />

      <VVTextField
        v-model="capacidade"
        type="number"
        label="Capacidade"
        placeholder="Digite aqui"
        name="capacidade"
      />

      <VVTextField
        v-model="tipo"
        type="text"
        label="Tipo"
        placeholder="Digite aqui"
        name="tipo"
      />
    </div>

    <v-divider />

    <div class="form-footer button-group">
      <UIButtonModalCancelButton @click="$emit('close')" />

      <UIButtonModalDeleteButton v-if="editId" @click.prevent="handleDelete" />

      <UIButtonModalEditButton v-if="editId" />
      <UIButtonModalSaveButton v-else />
    </div>
  </v-form>
</template>

<style scoped>
/* .form {
	overflow: hidden;
}

.form-body {
	overflow: auto;
} */

.form {
  overflow: auto;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-title {
  font-size: 24px;
  font-weight: 700;
}

.form {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 32px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-top: 20px;
  gap: 20px;
}

.button {
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  border: none;
}

.v-btn.buttonCancelar,
.v-btn.buttonCadastro {
  padding: 6px 20px;
  border-radius: 8px;
  height: auto;
  text-transform: none;
}

@media screen and (max-width: 450px) {
  .button-group {
    flex-direction: column;
    gap: 10px;
  }

  .v-btn.buttonCancelar,
  .v-btn.buttonCadastro {
    padding: 6px 20px;
  }
}
</style>
