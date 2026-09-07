<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import { useApiContext } from '~/composables/api-context/setup';
import type { ILesson } from '../../-Helpers/ILesson';

const props = defineProps<{ turmaId?: string | null }>();

const { resumoVinculos, perfisAtivos } = useApiContext();

const viewFor = computed(() => {
  if (props.turmaId) return 'student';
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
watch(currentDay, val => {
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
    ...(props.turmaId
      ? { turma: props.turmaId }
      : { professor: perfilId.value ?? '' }),
  };
});

const consultaQuery = agendamento.consulta(consultaParams);

// Mapear ocorrências para ILesson[]
const lessons = computed<ILesson[]>(() => {
  const ocorrencias = consultaQuery.data.value?.ocorrencias;
  if (!ocorrencias?.length) return [];

  return ocorrencias
    .filter((o: any) => o.horarioInicio && o.horarioFim)
    .sort((a: any, b: any) =>
      (a.horarioInicio ?? '').localeCompare(b.horarioInicio ?? '')
    )
    .map(
      (o: any): ILesson => ({
        id: o.id,
        version: o.version,
        occurrenceDate: o.dataInicio,
        repeticao: o.repeticao ?? null,
        discipline: o.nome ?? 'Sem nome',
        class: o.turmas?.[0]?.nome ?? o.turmas?.[0]?.periodo ?? '—',
        environment: o.ambientes?.[0]?.nome ?? '—',
        campus: o.turmas?.[0]?.curso?.campus?.apelido ?? '—',
        teacher: o.perfis?.[0]?.usuario?.nome ?? '—',
        startsAt: o.horarioInicio,
        endsAt: o.horarioFim,
      })
    );
});

const isLoading = computed(() => consultaQuery.isLoading.value);
</script>

<template>
  <div class="daily-view-container u-w-full">
    <SectionHorarioProfessorEAlunoDailyViewDaySquareList
      v-model="selectedDay"
    />

    <div class="lessons-list u-flex u-flex-col u-gap-5">
      <UILoading v-if="isLoading" />

      <template v-else-if="lessons.length > 0">
        <SectionHorarioProfessorEAlunoDailyViewLesson
          v-for="lesson in lessons"
          :key="`${lesson.startsAt}-${lesson.discipline}`"
          :lesson="lesson"
          :view-for="viewFor"
        />
      </template>

      <p v-else class="empty-state u-text-sm u-text-center u-py-8">
        Nenhuma aula neste dia.
      </p>
    </div>
  </div>
</template>

<style scoped>
.daily-view-container {
  max-width: 1536px;
}

.lessons-list {
  margin-top: var(--ui-space-8);
}

@media (min-width: 1024px) {
  .lessons-list {
    margin-top: var(--ui-space-12);
  }
}

.empty-state {
  color: var(--ladesa-grey-color);
}
</style>
