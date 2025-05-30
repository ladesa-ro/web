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
} = useLadesaApiCrudCursos();

const { data: currentCurso, suspense } = useFindOneQuery(editIdRef);
await suspense();

type FormValues = {
  imagem: Blob | null | undefined;

  ofertaformacao: {
    id: string | null;
  };
  campus: {
    id: string | null;
  };

  nome: string;

  nomeAbreviado: string;
};

type FormOutput = {
  imagem: Blob | null | undefined;

  ofertaformacao: {
    id: string;
  };
  campus: {
    id: string;
  };

  nome: string;

  nomeAbreviado: string;
};

const initialFormValues = reactive({
  imagem: null,
  ofertaFormacao: {
    id: currentCurso.value?.ofertaFormacao?.id ?? null,
  },
  campus: {
    id: currentCurso.value?.campus?.id ?? null,
  },
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
    await apiClient.cursos.cursoDeleteOneById({ id: id });
    await queryClient.invalidateQueries({ queryKey: ['cursos'] });
    $emit('close');
  }
};

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional(),
  ofertaFormacao: yup.object().shape({
    id: yup.string().required('Oferta de Formação é obrigatório!'),
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
  setFieldValue,
  values: formValues,
} = useForm<FormValues, FormOutput>({
  validationSchema: schema,
  initialValues: initialFormValues,
});

const onSubmit = handleSubmit(async (values: FormOutput) => {
  const editId = editIdRef.value;

  const { imagem, ofertaFormacao, ...data } = values as any;

  let id;

  if (editId === null) {
    const cursoCriado = await apiClient.cursos.cursoCreate({
      requestBody: {
        ...data,
        ofertaFormacao,
      },
    });

    id = cursoCriado.id;
  } else {
    await apiClient.cursos.cursoUpdateOneById({
      id: editId,
      requestBody: {
        ...data,
        ofertaFormacao,
      },
    });

    id = editId;
  }

  if (imagem) {
    await apiClient.cursos.cursoSetImagemCapa({
      id: id,
      formData: {
        file: imagem,
      },
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
  set: value => {
    formValues.nome = value;
  },
});

const nomeAbreviado = computed({
  get: () => formValues.nomeAbreviado,
  set: value => {
    formValues.nomeAbreviado = value;
  },
});

function onClose() {
  $emit('close');
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      :on-close="onClose"
      :title="editId ? 'Editar Curso' : 'Cadastrar Curso'"
    >
      <VVSelectImage name="imagem" />

      <VVAutocompleteAPIOfertaFormacao name="ofertaFormacao.id" />

      <VVAutocompleteAPICampus name="campus.id" />

      <VVTextField
        v-model="nome"
        label="Nome"
        name="nome"
        placeholder="Digite aqui"
        type="text"
      />

      <VVTextField
        v-model="nomeAbreviado"
        label="Nome Abreviado"
        name="nomeAbreviado"
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
