<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useApiClient, useApiDisciplinasFindOne } from '~/composables';

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

const { disciplina: currentDisciplina } =
  await useApiDisciplinasFindOne(editIdRef);

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

function onClose() {
  $emit('close');
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      :on-close="onClose"
      :title="editId ? 'Editar Disciplina' : 'Cadastrar Disciplina'"
    >
      <VVSelectImage name="imagem" />

      <VVTextField
        v-model="nome"
        type="text"
        label="Nome"
        placeholder="Digite aqui"
        name="nome"
      />

      <VVTextField
        v-model="nomeAbreviado"
        type="text"
        label="Nome Abreviado"
        placeholder="Digite aqui"
        name="nomeAbreviado"
      />

      <VVTextField
        v-model="cargaHoraria"
        type="number"
        label="Carga Horária"
        placeholder="Digite aqui"
        name="cargaHoraria"
      />

      <template #button-group>
        <UIButtonModalCancelButton @click="$emit('close')" />

        <UIButtonModalDeleteButton
          v-if="editId"
          @click.prevent="handleDelete"
        />
        <UIButtonModalEditButton v-if="editId" />
        <UIButtonModalSaveButton v-else />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
