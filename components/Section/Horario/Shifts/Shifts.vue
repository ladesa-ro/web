<script setup lang="ts">
import { computed } from 'vue';
import type { IDiasDaSemana, ITurnos } from '../IGradeHorario';

type Props = {
  turnos: ITurnos;
  diasDaSemana: IDiasDaSemana;
};

defineProps<Props>();

// Isso aqui é uma tabela que evidencia as disciplinas e professor, tem um erro Kauan, pq ele ta repetindo em todos os turnos, mais a verificaçaõ ta feita.
const gradeDisciplinas = [
  { diaDaSemana: 1, horarios: [1], disciplina: 'Matemática', professor: 'Prof. João', turno: 'Matutino' },
  { diaDaSemana: 1, horarios: [2], disciplina: 'Física', professor: 'Prof. João', turno: 'Noturno' },
  { diaDaSemana: 1, horarios: [3], disciplina: 'Programação Web', professor: 'Prof. João', turno: 'Vespertino' },
];

// Faz a verificaçaõ dos professores estão em três turnos simultâneamente, ta fazendo a verificaçao~certinho!
const professoresEmTresTurnos = computed(() => {
  const turnosPorProfessor: Record<string, Set<string>> = {};

  // Faz o mapeamento dos professores e turnos, um foreach paar auxiliar no resultado e evitar erro
  gradeDisciplinas.forEach(({ professor, turno }) => {
    if (!turnosPorProfessor[professor]) {
      turnosPorProfessor[professor] = new Set();
    }
    turnosPorProfessor[professor].add(turno);
  });

  // Retorna os professoresss que estõa em 3 turnos, mt, vp, e nt
  return Object.keys(turnosPorProfessor).filter(
    (professor) => turnosPorProfessor[professor].size === 3
  );
});

// Serve apenas para exibir na tela o alert de 3 professores em 3 turnos, foi pedido só o background mais tava mt simples, coloquei esse v-alert
const showAlert = computed(() => professoresEmTresTurnos.value.length > 0);
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
    }"
    :style="{
      backgroundColor: gradeDisciplinas.some(
        (d) => professoresEmTresTurnos.includes(d.professor) && d.turno === turno.nome
      )
        ? 'orange'
        : 'inherit',
    }"
    :gradeDisciplinas="gradeDisciplinas"
  />
</template>
