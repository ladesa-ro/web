<script lang="ts" setup>
import type { IDiasDaSemana, IGradeDisciplina, ITurno } from '../IGradeHorario';

type Props = {
  turno: ITurno;
  diasDaSemana: IDiasDaSemana;
  gradeDisciplinas: IGradeDisciplina[];
};

const props = defineProps<Props>();

const hoveredRowIndex = ref<number | null>(null);

function setHoveredRow(index: number | null) {
  hoveredRowIndex.value = index;
}

function getAula(dia: number, horario: number) {
  return props.gradeDisciplinas.find(
    aula => aula.diaDaSemana === dia && aula.horarios.includes(horario)
  );
}
</script>

<template>
  <div
    :style="{ gridRow: `span ${props.turno.horarios.length}` }"
    class="shift u-grid u-overflow-hidden u-mt-4 u-pr-2"
  >
    <SectionHorarioProfessorEAlunoShiftTag :turno="props.turno" />

    <!-- Coluna dos horários -->
    <div class="shift__hours-column u-grid">
      <div
        v-for="(horario, index) in props.turno.horarios"
        :key="horario.hora"
        :class="{
          'shift__row--divider': index < props.turno.horarios.length - 1,
          'shift__row--first': index === 0,
          'shift__row--last': index === props.turno.horarios.length - 1,
          'shift__row--interval': horario.tipo === 'intervalo',
          'shift__row--hovered': hoveredRowIndex === index,
        }"
        class="shift__row u-text-center u-m-0 u-px-2 u-flex u-items-center u-justify-center"
        @mouseleave="setHoveredRow(null)"
        @mouseover="setHoveredRow(index)"
      >
        {{ horario.hora }}
      </div>
    </div>

    <!-- Colunas dos dias da semana -->
    <div
      v-for="(diaDaSemana, colIndex) in props.diasDaSemana"
      :key="diaDaSemana.nome"
      :style="{ gridColumnStart: 3 + colIndex }"
      class="shift__day-column u-grid"
    >
      <div
        v-for="(horario, rowIndex) in props.turno.horarios"
        :key="horario.hora"
        :class="{
          'shift__row--divider': rowIndex < props.turno.horarios.length - 1,
          'shift__row--first': rowIndex === 0,
          'shift__row--last': rowIndex === props.turno.horarios.length - 1,
          'shift__row--interval': horario.tipo === 'intervalo',
          'shift__row--hovered': hoveredRowIndex === rowIndex,
        }"
        class="shift__row u-text-center u-m-0 u-px-2 u-flex u-items-center u-justify-center"
        @mouseleave="setHoveredRow(null)"
        @mouseover="setHoveredRow(rowIndex)"
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

.shift {
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  grid-column: 1 / -1;
  border: 2px solid var(--ladesa-green-1-color);
}

.shift__hours-column {
  grid-template-rows: subgrid;
  grid-column-start: 2;
  grid-row: 1 / -1;
}

.shift__day-column {
  grid-template-rows: subgrid;
  grid-column-start: 3;
  grid-row: 1 / -1;
}

.shift__row {
  border-color: var(--ladesa-text-default-color);
}

.shift__row--divider {
  border-bottom: 2px solid;
  padding-bottom: 2px;
}

.shift__row--first {
  margin-top: var(--ui-space-3);
}

.shift__row--last {
  margin-bottom: var(--ui-space-3);
}

.shift__row--interval {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 35%);
}

.shift__row--hovered {
  background-color: rgb(from var(--ladesa-green-2-color) R G B / 15%);
}
</style>
