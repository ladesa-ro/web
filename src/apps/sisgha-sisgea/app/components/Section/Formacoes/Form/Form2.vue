<script lang="ts" setup>
import { useField, useFieldArray } from 'vee-validate';
import { FormMode } from '~/utils/constants';
import EtapasFormacao from './EtapasFormacao.vue';

const props = defineProps<{
  mode: FormMode;
  isBusy: boolean;
  editId?: string | null;
}>();

const emit = defineEmits<{
  close: [];
  previous: [];
}>();

useProvideFormContext({
  isBusy: computed(() => props.isBusy),
  mode: computed(() => props.mode),
});

const { value: duracaoPeriodoEmMeses } = useField<number>(
  'duracaoPeriodoEmMeses'
);

const quantidadePeriodos = computed(() =>
  Math.floor(12 / (duracaoPeriodoEmMeses.value || 6))
);

const { fields: periodos, replace } = useFieldArray<{
  numeroPeriodo: number;
  etapas: Array<{ nome: string; cor: string }>;
}>('periodos');

watch(
  quantidadePeriodos,
  count => {
    const newPeriodos = Array.from({ length: count }, (_, i) => {
      const numeroPeriodo = i + 1;
      const existing = periodos.value?.find(
        p => p.value?.numeroPeriodo === numeroPeriodo
      );
      return {
        numeroPeriodo,
        etapas: existing?.value?.etapas ?? [{ nome: '', cor: '#000000' }],
      };
    });
    replace(newPeriodos);
  },
  { immediate: true }
);
</script>

<template>
  <DialogModalBaseLayout
    :on-close="() => emit('close')"
    :title="
      editId ? 'Editar etapas do ano letivo' : 'Cadastrar etapas do ano letivo'
    "
  >
    <div v-if="editId" class="u-flex u-gap-3 u-items-center formacoes-form2__banner">
      <span
        class="i-mdi-alert-outline u-shrink-0 u-text-lg formacoes-form2__banner-icon"
      />
      <p class="u-text-xs u-font-medium formacoes-form2__banner-text">
        As edições nas etapas do ano letivo não terão efeito em calendários já
        existentes vinculados a essa formação, somente em calendários criados
        posteriormente.
      </p>
    </div>

    <EtapasFormacao
      v-for="(periodo, index) in periodos"
      :key="periodo.key"
      :period-number="index + 1"
      :name="`periodos[${index}]`"
    />

    <template #button-group>
      <UIButtonModalGoBack @click="emit('previous')" />
      <UIButtonModalCancel @click="emit('close')" />
      <UIButtonModalEdit v-if="mode === FormMode.MANAGE" :disabled="isBusy" />
      <UIButtonModalSave v-else :disabled="isBusy" />
    </template>
  </DialogModalBaseLayout>
</template>

<style scoped>
.formacoes-form2__banner {
  border-radius: 5px;
  background-color: rgb(from var(--ladesa-yellow-color) R G B / 10%);
  border: 1px solid rgb(from var(--ladesa-yellow-color) R G B / 10%);
  padding: var(--ui-space-2-5) var(--ui-space-3);
  overflow: clip;
}

.formacoes-form2__banner-icon {
  color: var(--ladesa-yellow-color);
}

.formacoes-form2__banner-text {
  color: var(--ladesa-yellow-color);
  letter-spacing: 0.025em;
}
</style>
