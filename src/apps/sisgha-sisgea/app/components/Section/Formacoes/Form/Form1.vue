<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from '~/composables/useToast';

type Props = { editId?: string | null };

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

const editIdRef = toRef(props, 'editId');

//

const $emit = defineEmits(['close', 'next']);

const ofertasFormacoes = useOfertasFormacoes();

const findOneQuery = ofertasFormacoes.findOne(editIdRef);
const currentOfertaFormacao = findOneQuery.data;
await findOneQuery.suspense();

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional(),
  nome: yup.string().required('Nome é obrigatório!'),
  apelido: yup.string().required('Apelido é obrigatório!'),
  modalidade: yup.string().required('Modalidade é obrigatório!'),
  duracaoPeriodo: yup.number().required('Duração do período é obrigatório!'),
});

const initialFormValues = reactive({
  imagem: null,
  nome: currentOfertaFormacao.value?.nome ?? '',
  apelido: currentOfertaFormacao.value?.slug ?? '',
  modalidade: currentOfertaFormacao.value?.modalidade?.id ?? '',
  duracaoPeriodo:
    currentOfertaFormacao.value?.duracaoPeriodoEmMeses ?? undefined,

  // campus: {
  //   id: currentOfertaFormacao.value?.campus?.id ?? null,
  // },
});

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

const {
  resetForm,
  handleSubmit,
  values: formValues,
} = useForm<FormValues, FormOutput>({
  validationSchema: schema,
  initialValues: initialFormValues,
});

const onSubmit = () => {};

const nome: Ref<string> = ref(formValues.nome);
const nomeAbreviado: Ref<string> = ref(formValues.apelido);
const duracao = ref(undefined);
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
        :items="[
          { label: 'Médio', value: 'medio' },
          { label: 'Técnico', value: 'tecnico' },
          { label: 'Graduação', value: 'graduacao' },
        ]"
      />

      <VVTextField
        v-model="nome"
        label="Nome"
        name="nome"
        placeholder="Digite aqui"
        type="text"
        :required="false"
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
        v-model="duracao"
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

        <!-- <UIButtonModalDelete v-if="editId" @click.prevent="handleDelete" /> -->
        <UIButtonModalAdvance @click="$emit('next')" />
        <!-- <UIButtonModalEdit v-if="editId" />
        <UIButtonModalSave v-else /> -->
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
