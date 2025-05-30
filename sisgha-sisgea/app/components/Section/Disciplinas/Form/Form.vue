<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useApiClient } from '~/composables';

type Props = {
  editId?: string | null;
};

const { editId = null } = defineProps<Props>();

//

const $emit = defineEmits(['close']);

const apiClient = useApiClient();
const queryClient = useQueryClient();

const {
  composables: { useFindOneQuery },
} = useLadesaApiCrudDisciplinas();

const { data: currentDisciplina, suspense } = useFindOneQuery(editId);
await suspense();

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
  const id = editId;

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
  values: formValues,
} = useForm<FormValues, FormOutput>({
  validationSchema: schema,
  initialValues: initialFormValues,
});

const onSubmit = handleSubmit(async (values: FormOutput) => {
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

const nome = ref(formValues.nome);
const nomeAbreviado = ref(formValues.nomeAbreviado);
const cargaHoraria = ref(formValues.cargaHoraria);

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

      <VVTextField label="Nome" name="nome" placeholder="Digite aqui" />

      <VVTextField
        label="Nome Abreviado"
        name="nomeAbreviado"
        placeholder="Digite aqui"
      />

      <VVTextField
        label="Carga Horária"
        name="cargaHoraria"
        placeholder="Digite aqui"
        type="number"
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
