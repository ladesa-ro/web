<script lang="ts" setup>
import { useForm, useFormValues } from 'vee-validate';
import { reservaSchema } from './-Helpers/schema';

const emit = defineEmits<{ created: [] }>();

const isActive = ref(false);

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: reservaSchema,
  initialValues: reservaSchema.getDefault(),
});

const formValues = useFormValues();
const ambienteId = computed(
  () => (formValues.value.ambiente as { id?: string | null } | null)?.id ?? null
);
const data = computed(() => formValues.value.data as string | undefined);
const inicio = computed(() => formValues.value.inicio as string | undefined);
const fim = computed(() => formValues.value.fim as string | undefined);

const { handle: handleWriteError, conflictMessage, clearConflictMessage } =
  useApiWriteErrorHandler();

const ambientes = useAmbientes();
const ambienteDetalhe = ambientes.findOne(ambienteId);
const campusId = computed(() => ambienteDetalhe.data.value?.bloco?.campus?.id ?? null);

const consultas = useCalendarioConsultas();
const ocupacaoQuery = consultas.ocupacao(
  computed(() => {
    if (!campusId.value || !data.value) return undefined;
    return { campus: campusId.value, dateStart: data.value, dateEnd: data.value };
  })
);

const ocupacaoAviso = computed(() => {
  if (!ambienteId.value || !inicio.value || !fim.value) return false;
  const ocupacoes = ocupacaoQuery.data.value?.ocupacoes ?? [];
  return ocupacoes.some(
    o =>
      o.ambienteIds.includes(ambienteId.value!) &&
      o.horarioInicio < fim.value! &&
      o.horarioFim > inicio.value!
  );
});

const agendamento = useCalendarioAgendamento();

function onOpen() {
  clearConflictMessage();
  resetForm({ values: reservaSchema.getDefault() });
  isActive.value = true;
}

function onClose() {
  isActive.value = false;
}

const onSubmit = handleSubmit(async values => {
  try {
    await agendamento.create({
      tipo: 'RESERVA',
      nome: values.motivo,
      dataInicio: values.data,
      dataFim: values.data,
      diaInteiro: false,
      horarioInicio: values.inicio,
      horarioFim: values.fim,
      ambientes: values.ambiente?.id ? [{ id: values.ambiente.id }] : [],
    });
  } catch (err) {
    const handled = await handleWriteError(err);
    if (!handled) throw err;
    return;
  }

  agendamento.invalidate();
  emit('created');
  onClose();
});
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <UIButtonDefault type="button" @click.stop.prevent="onOpen">
        Nova reserva
      </UIButtonDefault>
    </template>

    <DialogModalBaseLayout title="Nova reserva" :on-close="onClose">
      <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
        <p
          v-if="conflictMessage"
          class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-md p-3"
        >
          {{ conflictMessage }}
        </p>

        <VVAutocompleteAPIAmbiente name="ambiente.id" />

        <VVDateField name="data" label="Data" :required="true" />

        <VVTimeRangeField name-start="inicio" name-end="fim" label="Horário" />

        <p
          v-if="ocupacaoAviso"
          class="text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 rounded-md p-3"
        >
          Este ambiente já tem outra ocupação nesse período. Você ainda pode
          enviar a reserva, mas ela pode ser recusada pelo servidor.
        </p>

        <VVTextField name="motivo" label="Motivo" placeholder="Ex: Reunião do colegiado" />
      </form>

      <template #button-group>
        <UIButtonModalCancel @click="onClose" />
        <UIButtonModalSave :disabled="isSubmitting" @click="onSubmit" />
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>
