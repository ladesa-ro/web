<script lang="ts" setup>
import { useField } from 'vee-validate';
import { FormMode } from '~/utils/constants';

defineProps<{
  mode: FormMode;
  isBusy: boolean;
  isLoading: boolean;
}>();

const emit = defineEmits<{
  close: [];
  delete: [];
}>();

const { value: campusId } = useField<string>('campus.id');
const { value: ofertaFormacaoId } = useField<string>('ofertaFormacao.id');

watch(campusId, (newVal, oldVal) => {
  if (oldVal && newVal !== oldVal) {
    ofertaFormacaoId.value = '';
  }
});

// Derivar duração do período a partir da formação selecionada

const ofertasFormacoes = useOfertasFormacoes();

const ofertaFormacaoQuery = ofertasFormacoes.findOne(
  computed(() => ofertaFormacaoId.value || null),
);

const duracaoPeriodoEmMeses = computed(
  () => ofertaFormacaoQuery.data.value?.duracaoPeriodoEmMeses,
);

const duracaoLabel = computed(() => {
  const map: Record<number, string> = {
    12: 'Anual',
    6: 'Semestral',
    4: 'Quadrimestral',
  };
  const meses = duracaoPeriodoEmMeses.value;
  return meses ? map[meses] ?? `${meses} meses` : '';
});
</script>

<template>
  <UIFormLayout
    :title="mode === FormMode.MANAGE ? 'Editar Curso' : 'Cadastrar Curso'"
    :mode="mode"
    :is-busy="isBusy"
    :on-close="() => emit('close')"
    :on-delete="mode === FormMode.MANAGE ? () => emit('delete') : undefined"
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

    <VVTextField
      name="quantidadePeriodos"
      type="number"
      label="Quantidade de períodos"
      placeholder="Digite aqui"
      :min="1"
      :max="12"
    />

    <UIFormTextField
      name="duracaoPeriodo"
      label="Duração de cada período"
      :model-value="duracaoLabel"
      placeholder="Selecione uma formação primeiro"
      disabled
    />
  </UIFormLayout>
</template>
