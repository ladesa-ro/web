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
} = useLadesaApiCrudNiveisFormacoes();

const { data: currentNivelFormacao, suspense } = useFindOneQuery(editIdRef);
await suspense();

type FormValues = {
  slug: string;
};

type FormOutput = {
  slug: string;
};

const initialFormValues = reactive({
  slug: currentNivelFormacao.value?.slug ?? '',
});

const handleDelete = async () => {
  const id = editIdRef.value;
  if (!id) return;

  const confirmacao = window.confirm(
    'Você tem certeza que deseja deletar esse nível de formação?'
  );
  if (!confirmacao) return;

  try {
    await apiClient.niveisFormacoes.nivelFormacaoDeleteOneById({ id });
    await queryClient.invalidateQueries({ queryKey: ['niveis-formacoes'] });

    showToast('delete', 'success');
    $emit('close');
  } catch (e) {
    showToast('delete', 'error');
  }
};

const schema = yup.object().shape({
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
      await apiClient.niveisFormacoes.nivelFormacaoCreate({
        requestBody: { ...values },
      });
      showToast('cadastro', 'success');
    } else {
      await apiClient.niveisFormacoes.nivelFormacaoUpdate({
        id: editId,
        requestBody: { ...values },
      });
      showToast('atualizacao', 'success');
    }

    await queryClient.invalidateQueries({ queryKey: ['niveis-formacoes'] });

    resetForm();
    $emit('close');
  } catch (e) {
    showToast('cadastro', 'error');
    console.error(e);
  }
}, console.error);

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
      :title="editId ? 'Editar Nível de Formação' : 'Cadastrar Nível de Formação'"
    >
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
