<script lang="ts" setup>
import { useField } from 'vee-validate';
import { FormMode } from '~/utils/constants';

defineProps<{
  mode: FormMode;
  isBusy: boolean;
  isLoading: boolean;
  duracaoLabel: string;
  quantidadePeriodosLabel: string;
}>();

const emit = defineEmits<{
  close: [];
  delete: [];
}>();

const { value: campusId } = useField<string>('campus.id');
const { value: ofertaFormacaoId } = useField<string>('ofertaFormacao.id');

function resetOfertaFormacaoWhenCampusChanges(newVal: string, oldVal: string) {
  if (oldVal && newVal !== oldVal) {
    ofertaFormacaoId.value = '';
  }
}

function closeForm() {
  emit('close');
}

function deleteCurso() {
  emit('delete');
}

watch(campusId, resetOfertaFormacaoWhenCampusChanges);

</script>

<template>
  <UIFormLayout
    :title="mode === FormMode.MANAGE ? 'Editar Curso' : 'Cadastrar Curso'"
    :mode="mode"
    :is-busy="isBusy"
    :on-close="closeForm"
    :on-delete="mode === FormMode.MANAGE ? deleteCurso : undefined"
  >
    <VVSelectImage name="imagem" />

    <VVAutocompleteAPICampus
      name="campus.id"
      :is-loading="isLoading"
      :disabled="mode === FormMode.MANAGE"
    />

    <VVAutocompleteAPIOfertaFormacao
      name="ofertaFormacao.id"
      :is-loading="isLoading"
      :disabled="!campusId || mode === FormMode.MANAGE"
      :campus-id="campusId"
    />

    <VVTextField name="nome" label="Nome" placeholder="Digite aqui" />

    <VVTextField
      name="nomeAbreviado"
      label="Nome abreviado"
      placeholder="Digite aqui"
    />

    <UIFormTextField
      name="duracaoPeriodo"
      label="Duração de cada período"
      :model-value="duracaoLabel"
      placeholder="Selecione uma formação primeiro"
      disabled
    />

    <VVTextField
      name="quantidadePeriodos"
      type="number"
      :label="quantidadePeriodosLabel"
      placeholder="Digite aqui"
      :min="1"
      :max="12"
    />
  </UIFormLayout>
</template>
