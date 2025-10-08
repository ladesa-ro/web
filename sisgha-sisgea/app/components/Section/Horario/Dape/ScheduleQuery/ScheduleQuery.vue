<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useManualRefHistory } from '@vueuse/core';
import cloneDeep from 'lodash/cloneDeep';
import {
  aulasSemDiaSemanaExemplo,
  temposDeAulaExemplo,
} from '~/composables/schedule/EXEMPLO';
import {
  type WeekSchedule,
  type WeekScheduleHistory,
} from '~/composables/schedule/useScheduleTypes';
import { useWeekSchedule } from '~/composables/schedule/useWeekSchedule';
import { replaceCell } from '../Edit/-Helpers/replaceCell';
import { swapCells } from '../Edit/-Helpers/swapCells';
import ButtonsEditMode from './Buttons/ButtonsEditMode.vue';
import ButtonsVisualizationMode from './Buttons/ButtonsVisualizationMode.vue';
import Button from './Buttons/ScheduleQueryButton.vue';
import { getOwnerName } from './getOwnerName';

const id = useRoute().params.id as string;

const isProfessor = useRoute().path.includes('professor');

provide('scheduleOf', isProfessor ? 'professor' : 'turma');

const {
  data: scheduleOwner,
  isLoading,
  isError,
} = isProfessor
  ? useQuery(findUserById({ id }))
  : useQuery(findTurmaById({ id }));

const ownerName = getOwnerName(isLoading, isProfessor, scheduleOwner);

//

const weekSchedule: Ref<WeekSchedule> = ref(
  useWeekSchedule(temposDeAulaExemplo, aulasSemDiaSemanaExemplo)
) as Ref<WeekSchedule>;

const scheduleHistory: WeekScheduleHistory = useManualRefHistory(weekSchedule, {
  capacity: 10,
  clone: cloneDeep,
});

const editMode = ref(false);
const showBreaks = ref(true);

const swap = () => {
  const swapSuccess = swapCells(weekSchedule);
  if (swapSuccess) scheduleHistory.commit();
};

const replace = () => {
  const replaceSuccess = replaceCell(weekSchedule);
  if (replaceSuccess) scheduleHistory.commit();
};

//

const smallScreenAlert = ref(true);
</script>

<template>
  <DialogSkeleton
    v-if="editMode"
    mustHideInBigScreen
    :closeOnClickOutside="false"
    v-model="smallScreenAlert"
  >
    <div
      class="flex flex-col justify-center items-center gap-5 p-5 lg:p-7 bg-ldsa-bg border-2 border-ldsa-grey rounded-lg max-w-3xl m-5"
    >
      <h1 class="text-center font-semibold text-xl">Atenção!</h1>

      <UIAlert
        type="warning"
        message="A tela de seu dispositivo não tem tamanho suficiente para suportar a funcionalidade de edição de horário. Por favor, abra em um dispositivo maior para ter acesso a esta funcionalidade."
      />

      <UIButtonModalOk class="w-max" @click="editMode = false" />
    </div>
  </DialogSkeleton>

  <UIContainer variant="larger">
    <header class="flex justify-between items-center">
      <span class="flex gap-6 font-semibold text-lg">
        <span
          class="hover:shadow-[0_0_0_5px_rgb(0,0,0,0.05)] dark:hover:shadow-[0_0_0_5px_rgb(255,255,255,0.04)] hover:bg-ldsa-grey/15 flex items-center my-auto h-max rounded-full"
        >
          <NuxtLink
            v-show="!editMode"
            to="../../horario"
            class="flex items-center justify-center"
          >
            <IconsArrowAlt class="w-5.5 text-ldsa-grey" />
          </NuxtLink>
        </span>

        <UITitle
          v-if="isError"
          class="default"
          text="Não foi possível buscar os dados"
        />

        <UITitle v-else-if="isLoading" class="default" text="Carregando..." />

        <UITitle
          v-else-if="!editMode"
          class="default"
          :text="ownerName ?? 'Nome não disponível'"
        />

        <UITitle
          v-if="editMode"
          class="default"
          :text="'Modo Edição - ' + (ownerName ?? 'Nome não disponível')"
        />
      </span>

      <ButtonsVisualizationMode
        v-show="!editMode"
        v-model:edit-mode="editMode"
        v-model:show-breaks="showBreaks"
      />

      <ButtonsEditMode
        v-if="editMode"
        @swap="swap()"
        @replace="replace()"
        @disable-edit-mode="editMode = false"
      >
        <Button
          :disabled="!scheduleHistory.canUndo.value"
          @click="scheduleHistory.undo()"
        >
          <IconsUndoRedo class="w-4 scale-x-[-1]" />
        </Button>

        <Button
          :disabled="!scheduleHistory.canRedo.value"
          @click="scheduleHistory.redo()"
        >
          <IconsUndoRedo class="w-4" />
        </Button>
      </ButtonsEditMode>
    </header>

    <SectionHorarioDapeEditWeek
      class="mt-8"
      :editMode
      :showBreaks
      v-model="weekSchedule"
      @commit-history="scheduleHistory.commit()"
      @update:model-value="scheduleHistory.commit()"
    />
  </UIContainer>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

/* class used to win the specifity of UITitle's 'default' class */
.default {
  @apply text-lg h-max;
}
</style>
