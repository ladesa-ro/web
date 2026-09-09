<script lang="ts" setup>
import { ref } from 'vue';
import ScheduleShiftTag from './ScheduleShiftTag.vue';
import type {
  ScheduleDiscipline,
  ScheduleShift,
  ScheduleWeekDays,
} from './schedule';

export type ScheduleShiftProps = {
  turno: ScheduleShift;
  diasDaSemana: ScheduleWeekDays;
  gradeDisciplinas: ScheduleDiscipline[];
};

const props = defineProps<ScheduleShiftProps>();

const hoveredRowIndex = ref<number | null>(null);

const setHoveredRow = (index: number | null) => {
  hoveredRowIndex.value = index;
};

const getAula = (dia: number, horario: number) =>
  props.gradeDisciplinas.find(
    aula => aula.diaDaSemana === dia && aula.horarios.includes(horario)
  );
</script>

<template>
  <div
    class="ui-schedule-shift u-grid u-overflow-hidden u-mt-4 u-pr-2"
    :style="{ gridRow: `span ${props.turno.horarios.length}` }"
  >
    <ScheduleShiftTag :turno="props.turno" />

    <div class="ui-schedule-shift__hours u-grid">
      <div
        v-for="(horario, index) in props.turno.horarios"
        :key="horario.hora"
        class="ui-schedule-shift__cell u-text-center u-m-0 u-px-2 u-flex u-items-center u-justify-center"
        :class="{
          'ui-schedule-shift__cell--divider':
            index < props.turno.horarios.length - 1,
          'ui-schedule-shift__cell--first': index === 0,
          'ui-schedule-shift__cell--last':
            index === props.turno.horarios.length - 1,
          'ui-schedule-shift__cell--interval': horario.tipo === 'intervalo',
          'ui-schedule-shift__cell--hovered': hoveredRowIndex === index,
        }"
        @mouseleave="setHoveredRow(null)"
        @mouseover="setHoveredRow(index)"
      >
        {{ horario.hora }}
      </div>
    </div>

    <div
      v-for="(diaDaSemana, colIndex) in props.diasDaSemana"
      :key="diaDaSemana.nome"
      class="ui-schedule-shift__day u-grid"
      :style="{ gridColumnStart: 3 + colIndex }"
    >
      <div
        v-for="(horario, rowIndex) in props.turno.horarios"
        :key="horario.hora"
        class="ui-schedule-shift__cell u-text-center u-m-0 u-px-2 u-flex u-items-center u-justify-center"
        :class="{
          'ui-schedule-shift__cell--divider':
            rowIndex < props.turno.horarios.length - 1,
          'ui-schedule-shift__cell--first': rowIndex === 0,
          'ui-schedule-shift__cell--last':
            rowIndex === props.turno.horarios.length - 1,
          'ui-schedule-shift__cell--interval': horario.tipo === 'intervalo',
          'ui-schedule-shift__cell--hovered': hoveredRowIndex === rowIndex,
        }"
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

        <span v-if="horario.tipo === 'intervalo'">Intervalo</span>
      </div>
    </div>
  </div>
</template>
