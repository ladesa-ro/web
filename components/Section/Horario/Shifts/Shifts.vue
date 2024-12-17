<script setup lang="ts">
import { computed } from 'vue';
import type { IDiasDaSemana, ITurnos } from '../IGradeHorario';

type Props = {
  turnos: ITurnos;
  diasDaSemana: IDiasDaSemana;
};

defineProps<Props>();

const gradeDisciplinas = [
  { diaDaSemana: 1, horarios: [1], disciplina: 'Matemática', professor: 'Prof. João', turno: 'Matutino' },
  { diaDaSemana: 1, horarios: [2], disciplina: 'Física', professor: 'Prof. João', turno: 'Noturno' },
  { diaDaSemana: 1, horarios: [3], disciplina: 'Programação Web', professor: 'Prof. João', turno: 'Vespertino' },
];

const professoresEmTresTurnos = computed(() => {
  const turnosPorProfessor: Record<string, Set<string>> = {};

  gradeDisciplinas.forEach(({ professor, turno }) => {
    if (!turnosPorProfessor[professor]) {
      turnosPorProfessor[professor] = new Set();
    }
    turnosPorProfessor[professor].add(turno);
  });

  return Object.keys(turnosPorProfessor).filter(
    (professor) => turnosPorProfessor[professor].size === 3
  );
});

const showAlert = computed(() => professoresEmTresTurnos.value.length > 0);

// Função para verificar se o professor está em 3 turnos
const isProfessorInThreeShifts = (professor: string) => {
  return professoresEmTresTurnos.value.includes(professor);
};
</script>

<template>
  <SectionHorarioShift
    v-for="(turno, index) in turnos"
    :key="turno.nome"
    :turno="turno"
    :dias-da-semana="diasDaSemana"
    :class="{
      'rounded-t-[12px]': index === 0,
      'rounded-b-[12px]': index === turnos.length - 1,
      'border-l-4 border-orange-500': gradeDisciplinas.some(disciplina => isProfessorInThreeShifts(disciplina.professor) && disciplina.turno === turno.nome)
    }"
    :gradeDisciplinas="gradeDisciplinas"
  />
</template>
