<script lang="ts" setup>
import { useToast } from '#imports';
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useApiClient } from '~/composables';

type Props = {
  editId?: string | null;
};

const { editId = null } = defineProps<Props>();
const $emit = defineEmits(['close']);

const apiClient = useApiClient();
const queryClient = useQueryClient();
const { showToast } = useToast();

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
  try {
    const { imagem, ...data } = values;
    let id;

    if (editId === null) {
      const DisciplinaCriada = await apiClient.disciplinas.disciplinaCreate({
        requestBody: { ...data },
      });
      id = DisciplinaCriada.id;
      showToast('cadastro', 'success');
    } else {
      await apiClient.disciplinas.disciplinaUpdate({
        id: editId,
        requestBody: { ...data },
      });
      id = editId;
      showToast('atualizacao', 'success');
    }

    if (imagem) {
      await apiClient.disciplinas.disciplinaUpdateImagemCapa({
        id,
        formData: { file: imagem },
      });
      showToast('atualizacao', 'success');
    }

    await queryClient.invalidateQueries({ queryKey: ['disciplinas'] });
    resetForm();
    $emit('close');
  } catch (error: any) {
    console.error(error);
    showToast(
      editId ? 'atualizacao' : 'cadastro',
      'error',
      'Ocorreu um erro ao salvar a disciplina. Tente novamente.'
    );
  }
}, console.error);

const handleDelete = async () => {
  if (!editId) return;

  const resposta = window.confirm(
    'Você tem certeza de que deseja deletar esta Disciplina?'
  );
  if (!resposta) return;

  try {
    await apiClient.disciplinas.disciplinaDeleteOneById({ id: editId });
    await queryClient.invalidateQueries({ queryKey: ['disciplinas'] });
    showToast('delete', 'success');
    $emit('close');
  } catch (error: any) {
    console.error(error);
    showToast('delete', 'error');
  }
};

const onClose = () => $emit('close');
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
