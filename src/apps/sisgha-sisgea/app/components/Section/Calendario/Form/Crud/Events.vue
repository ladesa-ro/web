<script lang="ts" setup>
import dayjs from 'dayjs';
import type { CalendarioAgendamentoCreateInputDto } from '@ladesa-ro/web.api.client';
import type { IAgendamentoFormOutput } from '../Shared/schema';
import { useInjectCalendarioEvents } from '../../useCalendarioEventBus';

type Props = {
  calendarId?: string;
  eventName?: string;
  eventId?: string;
  showParticipants?: boolean;
};

const props = withDefaults(defineProps<Props>(), { showParticipants: false });

const agendamento = useCalendarioAgendamento();
const calendarioEvents = useInjectCalendarioEvents();

const isEvent = ref<boolean | null>(null);
const initialData = ref<Partial<CalendarioAgendamentoCreateInputDto>>({});
const selectedCalendarId = ref<string | null>(props.calendarId ?? null);
const eventVersion = ref<number | null>(null);
const repeticaoOriginal = ref<string | null>(null);

const scopeModalOpen = ref(false);
const scopeModalMode = ref<'edit' | 'delete'>('edit');
let scopeResolve:
  | ((v: { scope: string; motivo?: string } | null) => void)
  | null = null;

function promptScope(mode: 'edit' | 'delete') {
  scopeModalMode.value = mode;
  scopeModalOpen.value = true;
  return new Promise<{ scope: string; motivo?: string } | null>(resolve => {
    scopeResolve = resolve;
  });
}

function onScopeConfirm(payload: { scope: string; motivo?: string }) {
  scopeResolve?.(payload);
  scopeResolve = null;
}

function onScopeCancel() {
  scopeResolve?.(null);
  scopeResolve = null;
}

const formBaseRef = ref<{
  validateAndGetValues: () => Promise<IAgendamentoFormOutput | null>;
  setValues: (vals: Record<string, unknown>) => void;
  resetForm: (opts?: { values: Record<string, unknown> }) => void;
}>();

// Query reativa: carrega evento existente por ID
const eventQuery = agendamento.findOne(computed(() => props.eventId ?? null));

const { handle: handleWriteError, conflictMessage } =
  useApiWriteErrorHandler({
    onReload: async () => {
      await eventQuery.refetch();
    },
  });

watch(
  () => eventQuery.data.value,
  found => {
    if (!found) return;
    isEvent.value = true;
    eventVersion.value = found.version;
    repeticaoOriginal.value = found.repeticao ?? null;
    initialData.value = {
      nome: found.nome ?? '',
      cor: found.cor ?? undefined,
      diaInteiro: false,
      dataInicio: found.dataInicio
        ? dayjs(found.dataInicio).format('YYYY-MM-DD')
        : '',
      dataFim: found.dataFim
        ? dayjs(found.dataFim).format('YYYY-MM-DD')
        : undefined,
      horarioInicio: found.dataInicio
        ? dayjs(found.dataInicio).format('HH:mm')
        : undefined,
      horarioFim: found.dataFim
        ? dayjs(found.dataFim).format('HH:mm')
        : undefined,
    };

    // Preencher calendário vinculado ao evento existente
    const calendarios = (found as Record<string, unknown>)
      .calendariosLetivos as Array<{ id: string }> | undefined;
    if (calendarios && calendarios.length > 0 && calendarios[0]) {
      selectedCalendarId.value = calendarios[0].id;
    }
  },
  { immediate: true }
);

const effectiveCalendarId = computed(
  () => selectedCalendarId.value || props.calendarId || null
);

// Data da ocorrência usada como referência para editar-ocorrencia/editar-serie/
// cancelar-ocorrencia: como este formulário sempre opera sobre um único
// registro de agendamento (a série ou uma exceção), usamos a própria data de
// início carregada como a "ocorrência clicada".
const occurrenceDate = computed(() => initialData.value.dataInicio || '');

const validateEventCrud = async (): Promise<boolean> => {
  const data = await formBaseRef.value?.validateAndGetValues();
  if (!data) return false;

  const calId = effectiveCalendarId.value;

  conflictMessage.value = null;

  try {
    if (isEvent.value && props.eventId) {
      if (eventVersion.value === null) return false;

      if (repeticaoOriginal.value) {
        const choice = await promptScope('edit');
        if (!choice) return false;

        if (choice.scope === 'ESTA_OCORRENCIA') {
          await agendamento.editarOcorrencia(
            props.eventId,
            {
              dataOcorrencia: occurrenceDate.value,
              diaInteiro: data.diaInteiro,
              horarioInicio: data.horarioInicio ?? undefined,
              horarioFim: data.horarioFim ?? undefined,
              ...(calId ? { calendariosLetivos: [{ id: calId }] } : {}),
            },
            eventVersion.value
          );
        } else {
          await agendamento.editarSerie(
            props.eventId,
            {
              dataOcorrencia: occurrenceDate.value,
              escopo: choice.scope === 'TODAS' ? 'TODAS' : 'ESTA_E_SEGUINTES',
              dataInicio: data.dataInicio,
              dataFim: data.dataFim ?? undefined,
              diaInteiro: data.diaInteiro,
              horarioInicio: data.horarioInicio ?? undefined,
              horarioFim: data.horarioFim ?? undefined,
              repeticao: data.repeticao ?? undefined,
              ...(calId ? { calendariosLetivos: [{ id: calId }] } : {}),
            },
            eventVersion.value
          );
        }
      } else {
        await agendamento.update(
          props.eventId,
          {
            nome: data.nome,
            cor: data.cor ?? undefined,
            diaInteiro: data.diaInteiro,
            dataInicio: data.dataInicio,
            dataFim: data.dataFim ?? undefined,
            horarioInicio: data.horarioInicio ?? undefined,
            horarioFim: data.horarioFim ?? undefined,
            ...(calId ? { calendariosLetivos: [{ id: calId }] } : {}),
          },
          eventVersion.value
        );
      }
    } else {
      await agendamento.create({
        tipo: 'EVENTO',
        nome: data.nome,
        cor: data.cor ?? undefined,
        diaInteiro: data.diaInteiro,
        dataInicio: data.dataInicio,
        dataFim: data.dataFim ?? undefined,
        horarioInicio: data.horarioInicio ?? undefined,
        horarioFim: data.horarioFim ?? undefined,
        ...(calId ? { calendariosLetivos: [{ id: calId }] } : {}),
      });
    }
  } catch (err) {
    const handled = await handleWriteError(err);
    if (!handled) throw err;
    return false;
  }

  await agendamento.invalidate();
  calendarioEvents.emitEventsUpdated();
  return true;
};

const deleteEvent = async (): Promise<boolean> => {
  const idToDelete = props.eventId || props.eventName;
  if (!idToDelete) {
    return false;
  }

  try {
    if (isEvent.value && props.eventId && repeticaoOriginal.value) {
      if (eventVersion.value === null) return false;

      const choice = await promptScope('delete');
      if (!choice) return false;

      if (choice.scope === 'ESTA_OCORRENCIA') {
        await agendamento.cancelarOcorrencia(
          props.eventId,
          {
            dataOcorrencia: occurrenceDate.value,
            motivo: choice.motivo,
          },
          eventVersion.value
        );
      } else {
        await agendamento.remove(idToDelete);
      }
    } else {
      await agendamento.remove(idToDelete);
    }

    await agendamento.invalidate();
    calendarioEvents.emitEventsUpdated();
    return true;
  } catch (e) {
    const handled = await handleWriteError(e);
    if (handled) return false;
    console.error('Erro deleteEvent:', e);
    return false;
  }
};

const fillForm = async () => {
  // No-op: dados carregam reativamente via eventQuery
};

defineExpose({ validateEventCrud, fillForm, deleteEvent });
</script>

<template>
  <div v-if="!eventQuery.isLoading.value" class="flex flex-col gap-5">
    <p
      v-if="conflictMessage"
      class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-md p-3"
    >
      {{ conflictMessage }}
    </p>

    <VVAutocompleteAPICalendarioLetivo
      v-model="selectedCalendarId"
      name="calendarioLetivo"
      label="Calendário Letivo"
      :disabled="!!props.calendarId"
    />

    <SectionCalendarioFormSharedEventoFormBase
      ref="formBaseRef"
      bare
      :initial-data="initialData"
      :disabled="!!isEvent"
      :show-participants="showParticipants"
    />
  </div>

  <SectionCalendarioEventRecurrenceScopeModal
    v-model="scopeModalOpen"
    :mode="scopeModalMode"
    @confirm="onScopeConfirm"
    @cancel="onScopeCancel"
  />
</template>
