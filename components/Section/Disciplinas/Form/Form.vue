<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import * as yup from 'yup';
import { useApiClient, useApiDisciplinasFindOne } from '~/composables';

//

type Props = {
  editId?: string | null;
};

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

//

const editIdRef = toRef(props, 'editId');

const $emit = defineEmits(['close']);

const apiClient = useApiClient();
const queryClient = useQueryClient();

const { disciplina: currentDisciplina } = await useApiDisciplinasFindOne(editIdRef);

type FormValues = {
  imagem: Blob | null | undefined;
  nome: string;
  nomeAbreviado: string;
  cargaHoraria: number;
};

type FormOutput = {
  imagem: Blob | null | undefined;
  nome: string;
  nomeAbreviado: string;
  cargaHoraria: number;
};

const initialFormValues = reactive({
  imagem: null,
  nome: currentDisciplina.value?.nome ?? '',
  nomeAbreviado: currentDisciplina.value?.nomeAbreviado ?? '',
  cargaHoraria: currentDisciplina.value?.cargaHoraria ?? undefined,
});

const handleDelete = async () => {
  const id = editIdRef.value;

  if (!id) return;

  const resposta = window.confirm(
    'Você tem certeza de que deseja deletar esta Disciplina?'
  );

  if (resposta) {
    await apiClient.disciplinas.disciplinaDeleteOneById({ id: id });
    await queryClient.invalidateQueries({ queryKey: ['disciplinas'] });
    $emit('close');
  }
};

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional(),
  nome: yup.string().required('Nome é obrigatório!'),
  nomeAbreviado: yup.string().required('Nome abreviado é obrigatório!'),
  cargaHoraria: yup.string().required('Carga horária é obrigatória!'),
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
    const DisciplinaCriada = await apiClient.disciplinas.disciplinaCreate({
      requestBody: { ...data },
    });
    id = DisciplinaCriada.id;
  } else {
    await apiClient.disciplinas.disciplinaUpdateOneById({
      id: editId,
      requestBody: {
        ...data,
      },
    });

    id = editId;
  }

  if (imagem) {
    await apiClient.disciplinas.disciplinaSetImagemCapa({
      id: id,
      formData: {
        file: imagem,
      },
    });
  }

  await queryClient.invalidateQueries({
    queryKey: ['disciplinas'],
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

const nomeAbreviado = computed({
  get: () => formValues.nomeAbreviado,
  set: (value) => {
    formValues.nomeAbreviado = value;
  },
});

const cargaHoraria = computed({
  get: () => formValues.cargaHoraria,
  set: (value) => {
    formValues.cargaHoraria = Number(value);
  },
});
</script>

<template>
  <v-form @submit.prevent="onSubmit" class="form">
    <div class="form-header">
      <h1 class="main-title">
        <span v-if="editId">Editar Disciplina</span>
        <span v-else>Cadastrar Nova Disciplina</span>
      </h1>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <VVSelectImage name="imagem" />

      <VVTextField
        type="text"
        v-model="nome"
        label="Nome"
        placeholder="Digite aqui"
        name="nome"
      />

      <VVTextField
        type="text"
        v-model="nomeAbreviado"
        label="Nome Abreviado"
        placeholder="Digite aqui"
        name="nomeAbreviado"
      />

      <VVTextField
        type="number"
        v-model="cargaHoraria"
        label="Carga Horária"
        placeholder="Digite aqui"
        name="cargaHoraria"
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
