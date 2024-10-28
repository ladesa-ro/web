<script setup lang="ts">
import { ref } from 'vue';
import type { IDiasDaSemana, ITurno } from '../IGradeHorario';

type Props = {
  turno: ITurno;
  diasDaSemana: IDiasDaSemana;
};

defineProps<Props>();

const hoveredRowIndex = ref<number | null>(null);


function setHoveredRow(index: number | null) {
  hoveredRowIndex.value = index;
}
</script>

<template>
  <div
    class="grid mt-4 pr-2 grid-cols-subgrid grid-rows-subgrid col-span-full row-span-6 border-2 border-[#118D3B] overflow-hidden"
  >
    <SectionHorarioShiftTag :turno="turno" />

    <!-- Coluna dos horários -->
    <div class="grid grid-rows-subgrid col-start-2 row-start-1 row-span-full">
      <div
        v-for="(horario, index) in turno.horarios"
        :key="horario.hora"
        class="text-center border-black m-0 px-2 flex items-center justify-center"
        :class="{
          'border-b-2 pb-[2px]': index < turno.horarios.length - 1,
          'mt-3': index === 0,
          'mb-3': index === turno.horarios.length - 1,
          'bg-[#DDE4DE]': horario.tipo === 'intervalo',
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
      v-for="(diaDaSemana, colIndex) in diasDaSemana"
      :key="diaDaSemana.nome"
      class="grid grid-rows-subgrid col-start-3 row-start-1 row-span-full"
      :style="{ gridColumnStart: 3 + colIndex }"
    >
      <div
        v-for="(horario, rowIndex) in turno.horarios"
        :key="horario.hora"
        class="text-center border-black m-0 px-2 flex items-center justify-center"
        :class="{
          'border-b-2 pb-[2px]': rowIndex < turno.horarios.length - 1,
          'mt-3': rowIndex === 0,
          'mb-3': rowIndex === turno.horarios.length - 1,
          'bg-[#DDE4DE]': horario.tipo === 'intervalo',
          'hovered-row': hoveredRowIndex === rowIndex,
        }"
        @mouseover="setHoveredRow(rowIndex)"
        @mouseleave="setHoveredRow(null)"
      >
        <span v-if="horario.tipo === 'aula'">
          {{
            Math.random() > 0.5
              ? `Disciplina - Sala ${Math.ceil(Math.random() * 50)}`
              : '-'
          }}
        </span>
        <span v-if="horario.tipo === 'intervalo'"> Intervalo </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hovered-row {
  background-color: #EBF8EF;
}
</style>
