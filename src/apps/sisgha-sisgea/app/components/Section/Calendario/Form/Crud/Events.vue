<script lang="ts" setup>
import dayjs from 'dayjs';
import type {
  CalendarioAgendamentoCreateInputDto,
} from '@ladesa-ro/web.api.client';
import type { IAgendamentoFormOutput } from '../Shared/schema';

type Props = {
  calendarId?: string;
  eventName?: string;
  eventId?: string;
  showParticipants?: boolean;
};

const props = withDefaults(defineProps<Props>(), { showParticipants: false });

const agendamento = useCalendarioAgendamento();

const isEvent = ref<boolean | null>(null);
const initialData = ref<Partial<CalendarioAgendamentoCreateInputDto>>({});

const formBaseRef = ref<{
  validateAndGetValues: () => Promise<IAgendamentoFormOutput | null>;
  setValues: (vals: Record<string, unknown>) => void;
  resetForm: (opts?: { values: Record<string, unknown> }) => void;
}>();

// Query reativa: carrega evento existente por ID
const eventQuery = agendamento.findOne(
  computed(() => props.eventId ?? null),
);

watch(
  () => eventQuery.data.value,
  (found) => {
    if (!found) return;
    isEvent.value = true;
    initialData.value = {
      nome: found.nome ?? '',
      cor: found.cor ?? undefined,
      diaInteiro: false,
      dataInicio: found.dataInicio ? dayjs(found.dataInicio).format('YYYY-MM-DD') : '',
      dataFim: found.dataFim ? dayjs(found.dataFim).format('YYYY-MM-DD') : undefined,
      horarioInicio: found.dataInicio ? dayjs(found.dataInicio).format('HH:mm') : undefined,
      horarioFim: found.dataFim ? dayjs(found.dataFim).format('HH:mm') : undefined,
    };
  },
  { immediate: true },
);

const validateEventCrud = async (): Promise<boolean> => {
  const data = await formBaseRef.value?.validateAndGetValues();
  if (!data) return false;

  if (isEvent.value && props.eventId) {
    await agendamento.update(props.eventId, {
      nome: data.nome,
      cor: data.cor ?? undefined,
      diaInteiro: data.diaInteiro,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim ?? undefined,
      horarioInicio: data.horarioInicio ?? undefined,
      horarioFim: data.horarioFim ?? undefined,
      ...(props.calendarId ? { calendariosLetivos: [{ id: props.calendarId }] } : {}),
    });
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
      ...(props.calendarId ? { calendariosLetivos: [{ id: props.calendarId }] } : {}),
    });
  }

  await agendamento.invalidate();
  window.dispatchEvent(new CustomEvent('calendar-events-updated'));
  return true;
};

const deleteEvent = async (): Promise<boolean> => {
  const idToDelete = props.eventId || props.eventName;
  if (!isEvent.value || !idToDelete) {
    return false;
  }

  try {
    await agendamento.remove(idToDelete);
    await agendamento.invalidate();
    window.dispatchEvent(new CustomEvent('calendar-events-updated'));
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
  <div v-if="!eventQuery.isLoading.value">
    <SectionCalendarioFormSharedEventoFormBase
      ref="formBaseRef"
      bare
      :initial-data="initialData"
      :disabled="!!isEvent"
      :show-participants="showParticipants"
    />
  </div>
</template>
