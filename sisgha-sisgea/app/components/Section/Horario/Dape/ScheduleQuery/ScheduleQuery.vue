<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import {
  aulasSemDiaSemanaExemplo,
  temposDeAulaExemplo,
} from '~/composables/schedule/EXEMPLO';
import {
  type WeekSchedule,
  type WeekScheduleHistory,
} from '~/composables/schedule/useScheduleTypes';
import { useWeekSchedule } from '~/composables/schedule/useWeekSchedule';
import ButtonsEditMode from './Buttons/ButtonsEditMode.vue';
import ButtonsVisualizationMode from './Buttons/ButtonsVisualizationMode.vue';
import { getOwnerName } from './getOwnerName';
import { useManualRefHistory, useRefHistory } from '@vueuse/core';
import { useSelectedCells } from '~/composables/schedule/edit/useSelectedScheduleCells';
import { cloneDeep } from 'lodash';
import Button from './Buttons/ScheduleQueryButton.vue';
import { swapCells } from '../Edit/swapCells';

// import { swapCells } from '../Edit/swapCells';

// const id = useRoute().params.id as string;

// const isProfessor = useRoute().path.includes('professor');

// const {
//   data: scheduleOwner,
//   isLoading,
//   isError,
// } = isProfessor
//   ? useQuery(findUserById({ id }))
//   : useQuery(findTurmaById({ id }));

// const ownerName = getOwnerName(isLoading, isProfessor, scheduleOwner);

const ownerName = 'sabolitas lindoca';

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
  swapCells(weekSchedule);
  scheduleHistory.commit();
};
</script>

<template>
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

        <!-- <UITitle
          v-if="isError"
          class="default"
          text="Não foi possível buscar os dados"
        />

        <UITitle v-else-if="isLoading" class="default" text="Carregando..." /> -->

        <!-- v-else-if="!editMode" -->
        <UITitle
          v-if="!editMode"
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
        @replace=""
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
