<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { indisponibilidadeSchema } from './-Helpers/schema';
import { DIAS_SEMANA } from './-Helpers/types';
import type {
  IndisponibilidadeFormPayload,
  IndisponibilidadeItem,
} from './-Helpers/types';

const props = defineProps<{
  modelValue: boolean;
  item: IndisponibilidadeItem | null;
  diaSemanaPreSelecionado?: number | null;
  saving?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  submit: [payload: IndisponibilidadeFormPayload];
}>();

const modoOptions = [
  { label: 'Semanal', value: 'semanal' },
  { label: 'Data específica', value: 'data' },
];

const tipoOptions = [
  { label: 'Bloqueio (nunca aloca)', value: 'BLOQUEIO' },
  { label: 'Preferência (evita alocar)', value: 'PREFERENCIA' },
];

const diaSemanaOptions = DIAS_SEMANA.map(dia => ({
  label: dia.label,
  value: dia.value,
}));

const { handleSubmit, resetForm, values } = useForm({
  validationSchema: indisponibilidadeSchema,
  initialValues: indisponibilidadeSchema.getDefault(),
});

const isEditing = computed(() => !!props.item?.id);

watch(
  () => [props.modelValue, props.item, props.diaSemanaPreSelecionado] as const,
  ([open, item, diaSemanaPreSelecionado]) => {
    if (!open) return;

    if (item) {
      resetForm({
        values: {
          modo: item.data ? 'data' : 'semanal',
          diaSemana: item.diaSemana ?? 0,
          data: item.data ?? null,
          inicio: item.inicio,
          fim: item.fim,
          tipo: item.tipo,
          motivo: item.motivo ?? '',
        },
      });
    } else {
      resetForm({
        values: {
          ...indisponibilidadeSchema.getDefault(),
          diaSemana: diaSemanaPreSelecionado ?? 0,
        },
      });
    }
  },
  { immediate: true }
);

const save = handleSubmit(formValues => {
  emit('submit', {
    tipo: formValues.tipo,
    diaSemana: formValues.modo === 'semanal' ? formValues.diaSemana : null,
    data: formValues.modo === 'data' ? formValues.data : null,
    inicio: formValues.inicio,
    fim: formValues.fim,
    motivo: formValues.motivo || null,
  });
});

function close() {
  emit('update:modelValue', false);
}
</script>

<template>
  <DialogSkeleton
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <DialogModalBaseLayout
      v-if="modelValue"
      :title="isEditing ? 'Editar indisponibilidade' : 'Nova indisponibilidade'"
      :close-button="true"
      :on-close="close"
    >
      <form class="flex flex-col gap-4" @submit.prevent="save">
        <VVOptionFieldsRadioGroup
          name="modo"
          label="Recorrência"
          :items="modoOptions"
          orientation="horizontal"
        />

        <VVSelectField
          v-if="values.modo === 'semanal'"
          name="diaSemana"
          label="Dia da semana"
          :items="diaSemanaOptions"
        />
        <VVDateField v-else name="data" label="Data" :required="true" />

        <VVTimeRangeField
          name-start="inicio"
          name-end="fim"
          label="Horário"
        />

        <VVOptionFieldsRadioGroup
          name="tipo"
          label="Tipo"
          :items="tipoOptions"
        />
        <p class="text-xs text-ldsa-grey px-1 -mt-2">
          Bloqueio: nunca aloca. Preferência: evita alocar, mas não impede.
        </p>

        <VVTextField
          name="motivo"
          label="Motivo"
          placeholder="Opcional"
        />
      </form>

      <template #button-group>
        <button
          type="button"
          class="rounded-lg border border-ldsa-grey/30 px-4 py-2 text-sm font-medium"
          @click="close"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="rounded-lg bg-ldsa-green-1 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          :disabled="saving"
          @click="save"
        >
          Salvar
        </button>
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>
