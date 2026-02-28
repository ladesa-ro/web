<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useApiClient } from '~/composables';
import { useToast } from '~/composables/useToast';

const { showToast } = useToast();

type Props = { editId?: string | null };

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
} = useLadesaApiCrudOfertasFormacoes();

const { data: currentOfertaFormacao, suspense } = useFindOneQuery(editIdRef);
await suspense();

type FormValues = {
  id: string | null;
  nome: string;
  apelido: string;
  modalidade: string;
  duracaoPeriodo: number;
  // campus: {
  //   id: string | null;
  // };
  imagem: Blob | null | undefined;
};

type FormOutput = {
  nome: string;
  apelido: string;
  modalidade: string;
  duracaoPeriodo: number;
  // campus: {
  //   id: string | null;
  // };
  imagem: Blob | null | undefined;
};

const initialFormValues = reactive({
  imagem: null,
  nome: currentOfertaFormacao.value?.nome ?? '',
  apelido: currentOfertaFormacao.value?.slug ?? '',
  modalidade: currentOfertaFormacao.value?.modalidade ?? '',
  duracaoPeriodo: currentOfertaFormacao.value?.duracaoPeriodo ?? '',

  // campus: {
  //   id: currentOfertaFormacao.value?.campus?.id ?? null,
  // },
});

const handleDelete = async () => {
  const id = editIdRef.value;
  if (!id) return;

  const confirmacao = window.confirm(
    'Você tem certeza que deseja deletar essa formação?'
  );
  if (!confirmacao) return;

  try {
    await apiClient.ofertasFormacoes.ofertaFormacaoDeleteOneById({ id });
    await queryClient.invalidateQueries({ queryKey: ['formacoes'] });

    showToast('delete', 'success');

    $emit('close');
  } catch (e) {
    showToast('delete', 'error');
  }
};

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional(),
  nome: yup.string().required('Nome é obrigatório!'),
  apelido: yup.string().required('Apelido é obrigatório!'),
  modalidade: yup.string().required('Modalidade é obrigatório!'),
  duracaoPeriodo: yup.number().required('Duração do período é obrigatório!'),
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
  const { imagem, ofertaFormacao, ...data } = values as any;
  let id: string;

  try {
    if (!editId) {
      const ofertaFormacaoCriada =
        await apiClient.ofertasFormacoes.ofertaFormacaoCreate({
          requestBody: { ...data, ofertaFormacao },
        });
      id = ofertaFormacaoCriada.id;

      showToast('cadastro', 'success');
    } else {
      await apiClient.ofertasFormacoes.ofertaFormacaoUpdate({
        id: editId,
        requestBody: { ...data, ofertaFormacao },
      });

      id = editId;

      showToast('atualizacao', 'success');
    }

    // if (imagem) {
    //   await apiClient.ofertasFormacoes.ofeoUpdateImagemCapa({
    //     id,
    //     formData: { file: imagem },
    //   });
    // }

    await queryClient.invalidateQueries({ queryKey: ['formacoes'] });

    resetForm();
    $emit('close');
  } catch (e) {
    showToast('cadastro', 'error');
    console.error(e);
  }
}, console.error);

const nome: Ref<string> = ref(formValues.nome);
const nomeAbreviado: Ref<string> = ref(formValues.apelido);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      :on-close="() => $emit('close')"
      :title="editId ? 'Editar Formação' : 'Cadastrar Formação'"
    >
      <VVSelectImage name="imagem" />

      <!-- TODO: conectar esse form a api depois que a rota estiver td certa -->
      <UIFormOptionFieldsSelect
        multiple-options
        label="Níveis de Formação"
        placeholder="Selecione uma ou várias opções"
        :items="[{ label: '', value: '' }]"
      />

      <VVTextField
        v-model="nome"
        label="Nome"
        name="nome"
        placeholder="Digite aqui"
        type="text"
      />

      <VVTextField
        v-model="nomeAbreviado"
        label="Apelido"
        name="apelido"
        placeholder="Digite aqui"
        type="text"
      />

      <UIFormOptionFieldsSelect
        name="modalidade"
        label="Modalidade"
        placeholder="Selecione uma opção"
        :items="[
          { label: 'Presencial', value: 'presencial' },
          { label: 'Semipresencial', value: 'hibrido' },
          { label: 'À distância e ao vivo', value: 'aDistancia' },
          { label: 'EAD', value: 'ead' },
        ]"
      />

      <UIFormOptionFieldsSelect
        name="duracaoPeriodo"
        label="Duração de cada período"
        placeholder="Selecione uma opção"
        :items="[
          { label: 'Anual', value: 12 },
          { label: 'Semestral', value: 6 },
          { label: 'Quadrimestral', value: 4 },
        ]"
      />

      <template #button-group>
        <UIButtonModalCancel @click="$emit('close')" />

        <UIButtonModalDelete v-if="editId" @click.prevent="handleDelete" />
        <UIButtonModalAdvance />
        <!-- <UIButtonModalEdit v-if="editId" />
        <UIButtonModalSave v-else /> -->
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
