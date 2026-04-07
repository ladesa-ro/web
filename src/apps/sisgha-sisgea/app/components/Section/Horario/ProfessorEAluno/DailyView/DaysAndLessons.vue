<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import { useApiContext } from '~/composables/api-context/setup';
import type { ILesson } from '../../-Helpers/ILesson';

const { resumoVinculos, perfisAtivos } = useApiContext();

const viewFor = computed(() => {
  if (resumoVinculos.value.cargos.includes('professor')) return 'teacher';
  return 'student';
});

// Dia selecionado (elevado de DaySquareList)
// Se for domingo (day=0), ajusta para segunda (day=1)
const currentDay = useCurrentDay();

function ensureWeekday(day: Dayjs): Dayjs {
  return day.day() === 0 ? day.day(1) : day;
}

const selectedDay = ref<Dayjs>(ensureWeekday(currentDay.value));

// Quando currentDay mudar (ex: via popover do calendário), sincronizar
watch(currentDay, (val) => {
  selectedDay.value = ensureWeekday(val);
});

// Perfil do professor logado
const perfilId = computed(() => perfisAtivos.value?.[0]?.id ?? null);

// Consultar ocorrências da API
const agendamento = useCalendarioAgendamento();

const consultaParams = computed(() => {
  const dateStr = selectedDay.value.format('YYYY-MM-DD');
  return {
    dateStart: dateStr,
    dateEnd: dateStr,
    professor: perfilId.value ?? '',
  };
});

const consultaQuery = agendamento.consulta(consultaParams);

// Mapear ocorrências para ILesson[]
const lessons = computed<ILesson[]>(() => {
  const ocorrencias = consultaQuery.data.value?.ocorrencias;
  if (!ocorrencias?.length) return [];

  return ocorrencias
    .filter((o: any) => o.horarioInicio && o.horarioFim)
    .sort((a: any, b: any) => (a.horarioInicio ?? '').localeCompare(b.horarioInicio ?? ''))
    .map((o: any): ILesson => ({
      discipline: o.nome ?? 'Sem nome',
      class: o.turmas?.[0]?.nome ?? o.turmas?.[0]?.periodo ?? '—',
      environment: o.ambientes?.[0]?.nome ?? '—',
      campus: o.turmas?.[0]?.curso?.campus?.apelido ?? '—',
      teacher: o.perfis?.[0]?.usuario?.nome ?? '—',
      startsAt: o.horarioInicio,
      endsAt: o.horarioFim,
    }));
});

const isLoading = computed(() => consultaQuery.isLoading.value);
</script>

<template>
  <div class="max-w-screen-2xl w-full">
    <SectionHorarioProfessorEAlunoDailyViewDaySquareList
      v-model="selectedDay"
    />

    <div class="flex flex-col gap-5 mt-8 lg:mt-12">
      <UILoading v-if="isLoading" />

      <template v-else-if="lessons.length > 0">
        <SectionHorarioProfessorEAlunoDailyViewLesson
          v-for="lesson in lessons"
          :key="`${lesson.startsAt}-${lesson.discipline}`"
          :lesson="lesson"
          :view-for="viewFor"
        />
      </template>

      <p v-else class="text-ldsa-grey text-sm text-center py-8">
        Nenhuma aula neste dia.
      </p>
    </div>
  </div>
</template>
