<script setup lang="ts">
import { ref } from 'vue';
import type { IDiasDaSemana, ITurno } from '../IGradeHorario';

type Props = {
  turno: ITurno;
  diasDaSemana: IDiasDaSemana;
  gradeDisciplinas: Array<{
    diaDaSemana: number;
    horarios: number[];
    disciplina: string;
    professor: string;
  }>;
};

const props = defineProps<Props>();

const hoveredRowIndex = ref<number | null>(null);

function setHoveredRow(index: number | null) {
  hoveredRowIndex.value = index;
}

function getAula(dia: number, horario: number) {
  return props.gradeDisciplinas.find((aula) =>
    aula.diaDaSemana === dia && aula.horarios.includes(horario)
  );
}
</script>

<template>
  <div
    class="grid mt-4 pr-2 grid-cols-subgrid grid-rows-subgrid col-span-full row-span-6 border-2 border-ldsa-green-1 overflow-hidden"
  >
    <SectionHorarioShiftTag :turno="props.turno" />

    <!-- Coluna dos horários -->
    <div class="grid grid-rows-subgrid col-start-2 row-start-1 row-span-full">
      <div
        v-for="(horario, index) in props.turno.horarios"
        :key="horario.hora"
        class="text-center border-ldsa-text m-0 px-2 flex items-center justify-center"
        :class="{
          'border-b-2 pb-[2px]': index < props.turno.horarios.length - 1,
          'mt-3': index === 0,
          'mb-3': index === props.turno.horarios.length - 1,
          'interval-background': horario.tipo === 'intervalo',
          'hovered-row': hoveredRowIndex === index,
        }"
        @mouseover="setHoveredRow(index)"
        @mouseleave="setHoveredRow(null)"
      >
        {{ horario.hora }}
      </div>
    </div>

    <!-- Colunas dos dias da semana -->
    <div
      v-for="(diaDaSemana, colIndex) in props.diasDaSemana"
      :key="diaDaSemana.nome"
      class="grid grid-rows-subgrid col-start-3 row-start-1 row-span-full"
      :style="{ gridColumnStart: 3 + colIndex }"
    >
      <div
        v-for="(horario, rowIndex) in props.turno.horarios"
        :key="horario.hora"
        class="text-center border-ldsa-text m-0 px-2 flex items-center justify-center"
        :class="{
          'border-b-2 pb-[2px]': rowIndex < props.turno.horarios.length - 1,
          'mt-3': rowIndex === 0,
          'mb-3': rowIndex === props.turno.horarios.length - 1,
          'interval-background': horario.tipo === 'intervalo',
          'hovered-row': hoveredRowIndex === rowIndex,
        }"
        @mouseover="setHoveredRow(rowIndex)"
        @mouseleave="setHoveredRow(null)"
      >
      <template v-if="horario.tipo === 'aula'">
          <span v-if="getAula(colIndex + 1, rowIndex + 1)">
            {{ getAula(colIndex + 1, rowIndex + 1)?.disciplina }} - 
            {{ getAula(colIndex + 1, rowIndex + 1)?.professor }}
          </span>
          <span v-else>-</span>
        </template>
        <span v-if="horario.tipo === 'intervalo'"> Intervalo </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.turno {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
}

.interval-background {
  @apply bg-[#DDE4DE] dark:bg-[#262937];
}

.hovered-row {
  @apply bg-ldsa-green-2/15;
}
</style>
