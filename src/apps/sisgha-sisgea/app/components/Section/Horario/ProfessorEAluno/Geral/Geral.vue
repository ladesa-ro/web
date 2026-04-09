<script lang="ts" setup>
import dayjs from 'dayjs';
import { useApiContext } from '~/composables/api-context/setup';
import { agruparPorPeriodo } from '~/utils/horarios';
import type { IDiasDaSemana, IGradeDisciplina } from '../IGradeHorario';

const diasDaSemana: IDiasDaSemana = [
  { nome: 'Segunda' },
  { nome: 'Terça' },
  { nome: 'Quarta' },
  { nome: 'Quinta' },
  { nome: 'Sexta' },
  { nome: 'Sábado' },
];

const { perfisAtivos, resumoVinculos } = useApiContext();
const perfilId = computed(() => perfisAtivos.value?.[0]?.id ?? null);
const campusId = computed(
  () => resumoVinculos.value.mapaCargoCampi.professor?.[0]?.id ?? null
);

// Grade horária do campus
const gradesHorarias = useGradesHorarias();
const gradeQuery = gradesHorarias.findByCampus(campusId);

const defaultTurnos = [
  {
    nome: 'Matutino',
    horarios: [
      { hora: '07:30', horaFim: '08:20', tipo: 'aula' as const },
      { hora: '08:20', horaFim: '09:10', tipo: 'aula' as const },
      { hora: '09:10', horaFim: '10:00', tipo: 'aula' as const },
      { hora: '10:00', horaFim: '10:20', tipo: 'intervalo' as const },
      { hora: '10:20', horaFim: '11:10', tipo: 'aula' as const },
      { hora: '11:10', horaFim: '12:00', tipo: 'aula' as const },
    ],
  },
  {
    nome: 'Vespertino',
    horarios: [
      { hora: '13:00', horaFim: '13:50', tipo: 'aula' as const },
      { hora: '13:50', horaFim: '14:40', tipo: 'aula' as const },
      { hora: '14:40', horaFim: '15:30', tipo: 'aula' as const },
      { hora: '15:30', horaFim: '15:50', tipo: 'intervalo' as const },
      { hora: '15:50', horaFim: '16:40', tipo: 'aula' as const },
      { hora: '16:40', horaFim: '17:30', tipo: 'aula' as const },
    ],
  },
  {
    nome: 'Noturno',
    horarios: [
      { hora: '19:00', horaFim: '19:50', tipo: 'aula' as const },
      { hora: '19:50', horaFim: '20:40', tipo: 'aula' as const },
      { hora: '20:40', horaFim: '21:30', tipo: 'aula' as const },
      { hora: '21:30', horaFim: '21:50', tipo: 'intervalo' as const },
      { hora: '21:50', horaFim: '22:40', tipo: 'aula' as const },
      { hora: '22:40', horaFim: '23:30', tipo: 'aula' as const },
    ],
  },
];

const turnos = computed(() => {
  const grades = gradeQuery.data.value?.data ?? [];
  if (!grades.length) return defaultTurnos;

  // Juntar todos os intervalos de todas as grades e reagrupar por período (Matutino/Vespertino/Noturno)
  const todosIntervalos = grades.flatMap(g =>
    g.intervalos.map(i => ({
      inicio: i.inicio.substring(0, 5),
      fim: i.fim.substring(0, 5),
    }))
  );

  // Deduplicar por início
  const unicos = [...new Map(todosIntervalos.map(i => [i.inicio, i])).values()];

  const periodos = agruparPorPeriodo(unicos);

  return periodos
    .filter(p => p.intervalos.length > 0)
    .map(p => ({
      nome: p.nome,
      horarios: p.intervalos.map(i => ({
        hora: i.inicio,
        horaFim: i.fim,
        tipo: 'aula' as const,
      })),
    }));
});

// Semana baseada no currentDay (controlado pelo PopoverCalendar do header)
const currentDay = useCurrentDay();
const weekStart = computed(() => currentDay.value.day(1));
const weekEnd = computed(() => currentDay.value.day(6));

// Ocorrências da semana
const agendamento = useCalendarioAgendamento();
const consultaParams = computed(() => ({
  dateStart: weekStart.value.format('YYYY-MM-DD'),
  dateEnd: weekEnd.value.format('YYYY-MM-DD'),
  professor: perfilId.value ?? '',
}));
const consultaQuery = agendamento.consulta(consultaParams);

// Mapear ocorrências para gradeDisciplinas
const gradeDisciplinas = computed<IGradeDisciplina[]>(() => {
  const ocorrencias = consultaQuery.data.value?.ocorrencias;
  if (!ocorrencias?.length) return [];

  const grades = gradeQuery.data.value?.data ?? [];
  const allSlots = grades.flatMap(g =>
    g.intervalos.map(i => ({
      inicio: i.inicio.substring(0, 5),
      fim: i.fim.substring(0, 5),
    }))
  );

  return ocorrencias
    .filter((o: any) => o.horarioInicio && o.dataInicio)
    .map((o: any): IGradeDisciplina => {
      const diaDaSemana = dayjs(o.dataInicio).day(); // 0=dom, 1=seg...

      // Match por intervalo: encontrar índices dos slots que a ocorrência cobre
      const hInicio = (o.horarioInicio as string).substring(0, 5);
      const hFim = (o.horarioFim as string).substring(0, 5);

      const matchedIndices = allSlots
        .map((slot, idx) =>
          slot.inicio >= hInicio && slot.inicio < hFim ? idx + 1 : -1
        )
        .filter(idx => idx > 0);

      return {
        diaDaSemana,
        horarios: matchedIndices,
        disciplina: o.nome ?? 'Sem nome',
        professor: o.perfis?.[0]?.usuario?.nome ?? '—',
      };
    });
});

const isLoading = computed(
  () => gradeQuery.isLoading.value || consultaQuery.isLoading.value
);
</script>

<template>
  <UILoading v-if="isLoading" />

  <div v-else class="grade-horario">
    <div class="col-start-1 col-span-2" />

    <div class="grid grid-cols-subgrid col-span-6">
      <SectionHorarioProfessorEAlunoWeekHeaderDays
        :dias-da-semana="diasDaSemana"
      />
    </div>

    <SectionHorarioProfessorEAlunoShifts
      :dias-da-semana="diasDaSemana"
      :turnos="turnos"
      :grade-disciplinas="gradeDisciplinas"
    />
  </div>
</template>

<style scoped>
.grade-horario {
  display: grid;
  column-gap: 16px;
  grid-template-columns: min-content min-content repeat(6, 180px) min-content;
  grid-auto-rows: auto;
}
</style>
