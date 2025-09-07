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
import { swapCells } from '../Edit/swapCells';
import { useRefHistory } from '@vueuse/core';

const id = useRoute().params.id as string;

const isProfessor = useRoute().path.includes('professor');

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

// scheduleHistory is of type Ref<WeekScheduleHistory>, but typescript is picking on me so i just used "as any"
const scheduleHistory = ref(
  useRefHistory(weekSchedule, {
    deep: true,
    capacity: 10,
  }) as any
);

const editMode = ref(false);
const showBreaks = ref(true);

const swap = () => {
  swapCells(weekSchedule, scheduleHistory.value);
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
          :text="'Modo Edição - ' + ownerName"
        />
      </span>

      <ButtonsVisualizationMode
        v-show="!editMode"
        v-model:edit-mode="editMode"
        v-model:show-breaks="showBreaks"
      />

      <ButtonsEditMode
        v-if="editMode"
        v-model="editMode"
        @redo="scheduleHistory.redo()"
        @undo="scheduleHistory.undo()"
        @swap="swap()"
        @replace=""
      />
    </header>

    <SectionHorarioDapeEditWeek
      class="mt-8"
      :editMode
      :showBreaks
      v-model="weekSchedule"
      v-model:history="scheduleHistory"
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
