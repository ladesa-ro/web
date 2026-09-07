<script lang="ts" setup>
import { useField } from 'vee-validate';
import type { ParsedItem } from '~/composables/useOptionItems';
import { FormMode } from '~/utils/constants';

const props = defineProps<{
  mode: FormMode;
  isBusy: boolean;
  isLoading: boolean;
  coverSrc: string | null;
}>();

const emit = defineEmits<{
  close: [];
  next: [];
  delete: [];
}>();

const { value: duracaoPeriodoEmMeses } = useField<number | undefined>(
  'duracaoPeriodoEmMeses'
);

const duracaoItems = [
  { label: 'Anual', value: 12 },
  { label: 'Semestral', value: 6 },
  { label: 'Quadrimestral', value: 4 },
];

const duracaoSelected = computed<ParsedItem | undefined>({
  get: () =>
    duracaoItems.find(item => item.value === duracaoPeriodoEmMeses.value),
  set: (val: ParsedItem | undefined) => {
    duracaoPeriodoEmMeses.value = val?.value;
  },
});

useProvideFormContext({
  isBusy: computed(() => props.isBusy),
  mode: computed(() => props.mode),
});

const duracaoLabel = computed(() => {
  const map: Record<number, { nome: string; periodos: number }> = {
    12: { nome: 'Anual', periodos: 1 },
    6: { nome: 'Semestral', periodos: 2 },
    4: { nome: 'Quadrimestral', periodos: 3 },
  };

  const entry = duracaoPeriodoEmMeses.value
    ? map[duracaoPeriodoEmMeses.value]
    : null;

  if (!entry) return null;

  return `A duração de cada período foi definida como "${entry.nome}" e, portanto, em um único ano letivo há ${entry.periodos} período${entry.periodos > 1 ? 's' : ''}. Clique em "Próximo" para definir as etapas de cada período.`;
});
</script>

<template>
  <DialogModalBaseLayout
    :on-close="() => emit('close')"
    :title="mode === FormMode.MANAGE ? 'Editar formação' : 'Cadastrar formação'"
  >
    <VVSelectImage name="imagem" :existing-src="coverSrc" />

    <VVAutocompleteAPINivelFormacao
      name="niveisFormacoes"
      multiple
      :is-loading="isLoading"
    />

    <VVTextField name="nome" label="Nome" placeholder="Digite aqui" />

    <VVTextField name="slug" label="Nome abreviado" placeholder="Digite aqui" />

    <VVAutocompleteAPIModalidade name="modalidade.id" :is-loading="isLoading" />

    <VVAutocompleteAPICampusContext
      :mode="mode"
      name="campus.id"
      :is-loading="isLoading"
    />

    <UIFormOptionFieldsSelect
      v-model="duracaoSelected"
      label="Duração de cada período"
      placeholder="Selecione uma opção"
      :items="duracaoItems"
    />

    <div v-if="duracaoLabel" class="u-flex u-gap-3 u-items-center formacoes-form1__banner">
      <span
        class="i-mdi-information-outline u-shrink-0 u-text-lg formacoes-form1__banner-icon"
      />
      <p class="u-text-xs u-font-medium formacoes-form1__banner-text">
        {{ duracaoLabel }}
      </p>
    </div>

    <template #button-group>
      <UIButtonModalCancel @click="emit('close')" />
      <UIButtonModalDelete
        v-if="mode === FormMode.MANAGE"
        :disabled="isBusy"
        @click.prevent="emit('delete')"
      />
      <UIButtonModalAdvance :disabled="isBusy" @click="emit('next')" />
    </template>
  </DialogModalBaseLayout>
</template>

<style scoped>
.formacoes-form1__banner {
  border-radius: 5px;
  background-color: rgb(from var(--ladesa-blue-color) R G B / 10%);
  border: 1px solid rgb(from var(--ladesa-blue-color) R G B / 10%);
  padding: var(--ui-space-2-5) var(--ui-space-3);
  overflow: clip;
}

.formacoes-form1__banner-icon {
  color: var(--ladesa-blue-color);
}

.formacoes-form1__banner-text {
  color: var(--ladesa-blue-color);
  letter-spacing: 0.025em;
}
</style>
