<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { aberturaSolicitacaoSchema } from './-Helpers/schema';
import TextareaField from './-Helpers/TextareaField.vue';

const props = defineProps<{
  modelValue: boolean;
  eventoId: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  created: [];
}>();

const tipoOperacaoOptions = [
  { label: 'Mover', value: 'MOVER' },
  { label: 'Remover', value: 'REMOVER' },
];

const agendamento = useCalendarioAgendamento();
const eventoQuery = agendamento.findOne(computed(() => props.eventoId));
const evento = eventoQuery.data;

const solicitacoes = useCalendarioSolicitacaoMudanca();
const saving = ref(false);

const { handleSubmit, resetForm, values } = useForm({
  validationSchema: aberturaSolicitacaoSchema,
  initialValues: aberturaSolicitacaoSchema.getDefault(),
});

watch(
  () => props.modelValue,
  open => {
    if (open) {
      resetForm({ values: aberturaSolicitacaoSchema.getDefault() });
    }
  }
);

const save = handleSubmit(async formValues => {
  saving.value = true;
  try {
    const dadosPropostos: Record<string, unknown> = {};

    if (formValues.tipoOperacao === 'MOVER') {
      if (formValues.data) dadosPropostos.dataInicio = formValues.data;
      if (formValues.horarioInicio)
        dadosPropostos.horarioInicio = formValues.horarioInicio;
      if (formValues.horarioFim)
        dadosPropostos.horarioFim = formValues.horarioFim;
      if (formValues.ambienteId)
        dadosPropostos.ambienteId = formValues.ambienteId;
    }

    await solicitacoes.create({
      calendarioAgendamentoId: props.eventoId,
      tipoOperacao: formValues.tipoOperacao,
      dadosPropostos,
      justificativa: formValues.justificativa,
    });

    await solicitacoes.invalidate();

    emit('created');
    emit('update:modelValue', false);
  } finally {
    saving.value = false;
  }
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
      title="Solicitar mudança"
      :close-button="true"
      :on-close="close"
    >
      <form class="flex flex-col gap-4" @submit.prevent="save">
        <div class="text-sm text-ldsa-grey">
          Evento: <strong class="text-ldsa-text-default">{{ evento?.nome }}</strong>
          <span v-if="evento">
            — {{ evento.dataInicio }} {{ evento.horarioInicio?.slice(0, 5) }}
          </span>
        </div>

        <VVOptionFieldsRadioGroup
          name="tipoOperacao"
          label="O que deseja fazer?"
          :items="tipoOperacaoOptions"
          orientation="horizontal"
        />

        <template v-if="values.tipoOperacao === 'MOVER'">
          <VVDateField name="data" label="Nova data" />
          <VVTimeRangeField
            name-start="horarioInicio"
            name-end="horarioFim"
            label="Novo horário"
          />
          <VVAutocompleteAPIAmbiente name="ambienteId" label="Novo ambiente" />
        </template>

        <TextareaField
          name="justificativa"
          label="Justificativa"
          placeholder="Explique o motivo da solicitação"
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
          Enviar solicitação
        </button>
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>
