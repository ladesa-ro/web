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
      colecao: (found as Record<string, unknown>).colecao
        ? { id: ((found as Record<string, any>).colecao as { id: string }).id }
        : undefined,
      campus: (found as Record<string, unknown>).campus
        ? { id: ((found as Record<string, any>).campus as { id: string }).id }
        : undefined,
      motivo: (found as Record<string, unknown>).motivo as string | undefined,
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

const validateEventCrud = async (): Promise<boolean> => {
  const data = await formBaseRef.value?.validateAndGetValues();
  if (!data) return false;

  const calId = effectiveCalendarId.value;

  conflictMessage.value = null;

  try {
    if (isEvent.value && props.eventId) {
      if (eventVersion.value === null) return false;

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
          colecao: data.colecao?.id ? { id: data.colecao.id } : undefined,
          campus: data.campus?.id ? { id: data.campus.id } : undefined,
          motivo: data.motivo ?? undefined,
          ...(calId ? { calendariosLetivos: [{ id: calId }] } : {}),
        },
        eventVersion.value
      );
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
        colecao: data.colecao?.id ? { id: data.colecao.id } : undefined,
        campus: data.campus?.id ? { id: data.campus.id } : undefined,
        motivo: data.motivo ?? undefined,
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
    await agendamento.remove(idToDelete);
    await agendamento.invalidate();
    calendarioEvents.emitEventsUpdated();
    return true;
  } catch (e) {
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
</template>
