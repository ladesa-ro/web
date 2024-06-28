<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import * as yup from 'yup';
import { useApiBlocosFindOne, useApiClient } from '~/composables';

const props = defineProps({
  //props do modal criar e editar
  editId: {
    type: String,
    required: false,
    default: null,
  },
});

const editIdRef = toRef(props, 'editId');

const $emit = defineEmits(['close']);

const apiClient = useApiClient();
const queryClient = useQueryClient();

const { bloco: currentBloco } = await useApiBlocosFindOne(editIdRef);

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
  const resposta = window.confirm(
    'Você tem certeza de que deseja deletar esse bloco?'
  );

  if (resposta) {
    await apiClient.blocos.blocoDeleteById({ id: editIdRef.value });
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
    await apiClient.blocos.blocoUpdateById({
      id: editId,

      requestBody: {
        ...values,
      },
    });

    id = editId;
  }

  if (imagem) {
    await apiClient.blocos.blocoSetCoverImage({
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
  set: (value) => {
    formValues.nome = value;
  },
});

const codigo = computed({
  get: () => formValues.codigo,
  set: (value) => {
    formValues.codigo = value;
  },
});
</script>

<template>
  <v-form @submit.prevent="onSubmit" class="form">
    <div class="form-header">
      <h1 class="main-title">
        <span v-if="editId">Editar Bloco</span>
        <span v-else>Cadastrar Novo Bloco</span>
      </h1>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <VVSelectImage name="imagem" />

      <VVAutocompleteCampus name="campus.id" :disabled="Boolean(editId)" />

      <VVTextField
        v-model="nome"
        type="text"
        label="Nome"
        placeholder="Digite aqui"
        name="nome"
      />

      <VVTextField
        v-model="codigo"
        type="text"
        label="Código"
        placeholder="Digite aqui"
        name="codigo"
      />
    </div>

    <v-divider />

    <div class="form-footer button-group">
      <UIButtonModalCancelButton @click="$emit('close')" />

      <UIButtonModalDeleteButton @click.prevent="handleDelete" v-if="editId" />

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
