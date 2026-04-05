<script lang="ts" setup>
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import {
  calendarioLetivoEtapaFindAll,
  calendarioAgendamentoFindAll,
  calendarioAgendamentoFindById,
} from '@ladesa-ro/web.api.client';
import type {
  CalendarioAgendamentoFindOneOutputDto,
  CalendarioLetivoEtapaFindOneOutputDto, CalendarioAgendamentoCreateInputDto 
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

const isLoading = ref(true);
const isEvent = ref<boolean | null>(null);
const formReady = ref(false);

const initialData = ref<Partial<CalendarioAgendamentoCreateInputDto>>({});

const formBaseRef = ref<{
  validateAndGetValues: () => Promise<IAgendamentoFormOutput | null>;
  setValues: (vals: Record<string, unknown>) => void;
  resetForm: (opts?: { values: Record<string, unknown> }) => void;
}>();

const getEvent = async () => {
  if (!props.eventName && !props.eventId) return;

  try {
    const api = getApiClient();
    let checkEvents: { id: string; nome: string; cor: string | null; dataInicio: string; dataFim: string } | null = null;

    if (props.eventId) {
      try {
        const found = await api.call(calendarioAgendamentoFindById, {
          path: { id: props.eventId },
        });
        if (found) {
          checkEvents = {
            id: found.id,
            nome: found.nome ?? '',
            cor: found.cor ?? null,
            dataInicio: found.dataInicio ?? '',
            dataFim: found.dataFim ?? found.dataInicio ?? '',
          };
        }
      } catch {}
    } else if (props.eventName) {
      const query: Record<string, unknown> = {
        search: props.eventName,
        limit: 10,
      };
      if (props.calendarId) {
        query['filter.calendarioLetivo.id'] = [props.calendarId];
      }
      const result = await api.call(calendarioAgendamentoFindAll, { query });
      const found = (result.data ?? []).find(
        (o: CalendarioAgendamentoFindOneOutputDto) => o.id === props.eventName || o.nome === props.eventName
      );
      if (found) {
        checkEvents = {
          id: found.id,
          nome: found.nome ?? '',
          cor: found.cor ?? null,
          dataInicio: found.dataInicio ?? '',
          dataFim: found.dataFim ?? found.dataInicio ?? '',
        };
      }
    }

    let checkSteps: CalendarioLetivoEtapaFindOneOutputDto | null = null;
    if (props.eventName && props.calendarId) {
      const stepsRes = await api.call(calendarioLetivoEtapaFindAll, {
        path: { calendarioLetivoId: props.calendarId },
      });
      const eventNameNumber = Number(props.eventName.replace(/\D/g, ''));
      checkSteps = (stepsRes.data ?? []).find(
        (step: CalendarioLetivoEtapaFindOneOutputDto) =>
          step.id === props.eventName ||
          step.nomeEtapa === props.eventName ||
          step.ofertaFormacaoPeriodoEtapaId === String(eventNameNumber)
      ) ?? null;
    }

    if (checkEvents) {
      isEvent.value = true;
      initialData.value = {
        nome: checkEvents.nome ?? '',
        cor: checkEvents.cor ?? undefined,
        diaInteiro: false,
        dataInicio: checkEvents.dataInicio ? dayjs(checkEvents.dataInicio).format('YYYY-MM-DD') : '',
        dataFim: checkEvents.dataFim ? dayjs(checkEvents.dataFim).format('YYYY-MM-DD') : undefined,
        horarioInicio: checkEvents.dataInicio ? dayjs(checkEvents.dataInicio).format('HH:mm') : undefined,
        horarioFim: checkEvents.dataFim ? dayjs(checkEvents.dataFim).format('HH:mm') : undefined,
      };
    } else if (checkSteps) {
      isEvent.value = false;
      initialData.value = {
        nome: checkSteps.nomeEtapa,
        cor: undefined,
        diaInteiro: true,
        dataInicio: checkSteps.dataInicio ? dayjs(checkSteps.dataInicio).format('YYYY-MM-DD') : '',
        dataFim: checkSteps.dataTermino ? dayjs(checkSteps.dataTermino).format('YYYY-MM-DD') : undefined,
        horarioInicio: undefined,
        horarioFim: undefined,
      };
    }
  } catch (e) {
    console.error('Erro ao buscar evento:', e);
  }
};

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
    console.warn('Falta eventId/eventName para deletar');
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
  if (!formReady.value) {
    await new Promise<void>(resolve => {
      const stop = watch(formReady, ready => {
        if (ready) {
          resolve();
          stop();
        }
      });
    });
  }

  if (props.eventName) {
    await getEvent();
  }
};

onMounted(() => {
  formReady.value = true;
  isLoading.value = false;
});

defineExpose({ validateEventCrud, fillForm, deleteEvent });
</script>

<template>
  <div v-if="!isLoading">
    <SectionCalendarioFormSharedEventoFormBase
      ref="formBaseRef"
      bare
      :initial-data="initialData"
      :disabled="!!isEvent"
      :show-participants="showParticipants"
    />
  </div>
</template>
