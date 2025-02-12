<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useApiClient } from '~/composables';

const $emit = defineEmits(['close', 'next']);

const nextForm = () => {
  $emit('next'); // Emitir o evento de próximo
};

const years = [2024, 2023, 2022, 2021, 2020, 2019];

const closeForm = () => {
  $emit('close');
};

type Props = {
  editId?: string | null;
};

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

const editIdRef = toRef(props, 'editId');

const apiClient = useApiClient();
const queryClient = useQueryClient();

const {
  composables: { useFindOneQuery },
} = useLadesaApiCrudCursos();

const { data: currentCurso, suspense } = useFindOneQuery(editIdRef);
await suspense();

type FormValues = {
  imagem: Blob | null | undefined;
  ofertaFormacao: { id: string | null };
  campus: { id: string | null };
  nome: string;
  nomeAbreviado: string;
};

type FormOutput = {
  imagem: Blob | null | undefined;
  ofertaFormacao: { id: string };
  campus: { id: string };
  nome: string;
  nomeAbreviado: string;
};

const initialFormValues = reactive<FormValues>({
  imagem: null,
  ofertaFormacao: { id: currentCurso.value?.ofertaFormacao?.id ?? null },
  campus: { id: currentCurso.value?.campus?.id ?? null },
  nome: currentCurso.value?.nome ?? '',
  nomeAbreviado: currentCurso.value?.nomeAbreviado ?? '',
});

const handleDelete = async () => {
  const id = editIdRef.value;

  if (!id) return;

  const resposta = window.confirm(
    'Você tem certeza de que deseja deletar esse curso?'
  );

  if (resposta) {
    await apiClient.cursos.cursoDeleteOneById({ id });
    await queryClient.invalidateQueries({ queryKey: ['cursos'] });
    $emit('close');
  }
};

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional(),
  ofertaFormacao: yup.object().shape({
    id: yup.string().required('Oferta Formação é obrigatória!'),
  }),
  campus: yup.object().shape({
    id: yup.string().required('Campus é obrigatório!'),
  }),
  nome: yup.string().required('Nome do bloco é obrigatório!'),
  nomeAbreviado: yup
    .string()
    .required('Nome abreviado do bloco é obrigatório!'),
});

const {
  resetForm,
  handleSubmit,
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
    const cursoCriado = await apiClient.cursos.cursoCreate({
      requestBody: { ...data },
    });

    id = cursoCriado.id;
  } else {
    await apiClient.cursos.cursoUpdateOneById({
      id: editId,
      requestBody: {
        ...data,
      },
    });

    id = editId;
  }

  if (imagem) {
    await apiClient.cursos.cursoSetImagemCapa({
      id,
      formData: { file: imagem },
    });
  }

  await queryClient.invalidateQueries({
    queryKey: ['cursos'],
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
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-header">
      <h1 class="main-title">
        <span>Cadastrar Calendário</span>
      </h1>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <VVTextField
        v-model="nome"
        label="Nome"
        name="nome"
        placeholder="Digite aqui"
        type="text"
      />

      <VVAutocomplete
        :items="years"
        class="xl:max-w-[100%]"
        label="Ano letivo"
        name="year.id"
        placeholder="Selecione um ano"
      />

      <VVAutocompleteAPIOfertaFormacao
        v-model="formValues.ofertaFormacao.id"
        label="Oferta de Formação"
        name="ofertaFormacao.id"
      />

      <VVAutocompleteAPICurso name="curso.id" />
    </div>

    <v-divider />

    <div class="form-footer button-group">
      <UIButtonModalCancelButton @click="closeForm" />
      <UIButtonModalAdvancedButton @click="nextForm" />
    </div>
  </form>
</template>

<style scoped>
.form {
  overflow: auto;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  gap: 153px;
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
