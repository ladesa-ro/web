<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useApiClient } from '~/composables';
import { useToast } from '~/composables/useToast';

const { showToast } = useToast();

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
} = useLadesaApiCrudModalidades();

const { data: currentModalidade, suspense } = useFindOneQuery(editIdRef);
await suspense();

type FormValues = {
  nome: string;
  slug: string;
};

type FormOutput = {
  nome: string;
  slug: string;
};

const initialFormValues = reactive({
  nome: currentModalidade.value?.nome ?? '',
  slug: currentModalidade.value?.slug ?? '',
});

const handleDelete = async () => {
  const id = editIdRef.value;
  if (!id) return;

  const confirmacao = window.confirm(
    'Você tem certeza que deseja deletar essa modalidade?'
  );
  if (!confirmacao) return;

  try {
    await apiClient.modalidades.modalidadeDeleteOneById({ id });
    await queryClient.invalidateQueries({ queryKey: ['modalidades'] });

    showToast('delete', 'success');
    $emit('close');
  } catch (e) {
    showToast('delete', 'error');
  }
};

const schema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório!'),
  slug: yup.string().required('Slug é obrigatório!'),
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
  const editId = editIdRef.value ?? null;

  try {
    if (!editId) {
      await apiClient.modalidades.modalidadeCreate({
        requestBody: { ...values },
      });
      showToast('cadastro', 'success');
    } else {
      await apiClient.modalidades.modalidadeUpdate({
        id: editId,
        requestBody: { ...values },
      });
      showToast('atualizacao', 'success');
    }

    await queryClient.invalidateQueries({ queryKey: ['modalidades'] });

    resetForm();
    $emit('close');
  } catch (e) {
    showToast('cadastro', 'error');
    console.error(e);
  }
}, console.error);

const nome = computed({
  get: () => formValues.nome,
  set: (value: string) => { formValues.nome = value; },
});

const slug = computed({
  get: () => formValues.slug,
  set: (value: string) => { formValues.slug = value; },
});

const onClose = () => $emit('close');
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      :on-close="onClose"
      :title="editId ? 'Editar Modalidade' : 'Cadastrar Modalidade'"
    >
      <VVTextField
        v-model="nome"
        label="Nome"
        name="nome"
        placeholder="Digite aqui"
        type="text"
      />

      <VVTextField
        v-model="slug"
        label="Slug"
        name="slug"
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
