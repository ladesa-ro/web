<script lang="ts" setup>
import { useManualRefHistory } from '@vueuse/core';
import ButtonsEditMode from '~/components/Section/Horario/Dape/ScheduleQuery/Buttons/ButtonsEditMode.vue';
import ButtonsVisualizationMode from '~/components/Section/Horario/Dape/ScheduleQuery/Buttons/ButtonsVisualizationMode.vue';
import Button from '~/components/Section/Horario/Dape/ScheduleQuery/Buttons/ScheduleQueryButton.vue';
import {
  aulasSemDiaSemanaExemplo,
  temposDeAulaExemplo,
} from '~/../tests/fixtures/schedule-exemplo';
import type { WeekSchedule } from '~/utils/schedule/types';
import { useWeekSchedule } from '~/composables/schedule/useWeekSchedule';
import { getOwnerName } from './-Helpers/get-owner-name';
import DialogSmallScreen from './DialogSmallScreen.vue';

const id = useRoute().params.id as string;

const isProfessor = useRoute().path.includes('professor');

provide('scheduleOf', isProfessor ? 'professor' : 'turma');

const usuarios = useUsuarios();
const turmasEntity = useTurmas();

const {
  data: scheduleOwner,
  isLoading,
  isError,
} = isProfessor ? usuarios.findOne(id) : turmasEntity.findOne(id);

const ownerName = getOwnerName(isLoading, isProfessor, scheduleOwner);

//

const weekSchedule: Ref<WeekSchedule> = ref(
  useWeekSchedule(temposDeAulaExemplo, aulasSemDiaSemanaExemplo)
) as Ref<WeekSchedule>;

const { undo, redo, canRedo, canUndo, commit } = useManualRefHistory(
  weekSchedule,
  { clone: true, capacity: 15 }
);

const showBreaks = ref(true);
const editMode = ref(false);
const smallScreenAlert = ref(true);

provide('showBreaks', showBreaks);
provide('editMode', editMode);
</script>

<template>
  <DialogSmallScreen v-model="smallScreenAlert" />

  <UIContainer variant="larger">
    <UIBreadcrumbDapeBreadcrumb />

    <header class="u-flex u-justify-between u-items-center u-mb-8">
      <span class="u-flex u-gap-6 u-font-semibold u-text-lg">
        <span
          class="schedule-query-back-wrapper u-flex u-items-center u-rounded-full"
        >
          <NuxtLink
            v-show="!editMode"
            to="../../horario"
            class="u-flex u-items-center u-justify-center"
          >
            <IconsArrowAlt class="schedule-query-back-icon" />
          </NuxtLink>
        </span>

        <UITitle
          v-if="isError"
          class="default text"
          text="Não foi possível buscar os dados"
        />

        <UITitle
          v-else-if="isLoading"
          class="default text"
          text="Carregando..."
        />

        <UITitle
          v-else-if="!editMode"
          class="default text"
          :text="ownerName ?? 'Nome não disponível'"
        />

        <UITitle
          v-if="editMode"
          class="default text"
          :text="'Modo Edição - ' + (ownerName ?? 'Nome não disponível')"
        />
      </span>

      <ButtonsVisualizationMode />

      <ButtonsEditMode>
        <Button :disabled="!canUndo" @click="undo()">
          <IconsUndoRedo class="schedule-query-icon schedule-query-icon--flipped" />
        </Button>

        <Button :disabled="!canRedo" @click="redo()">
          <IconsUndoRedo class="schedule-query-icon" />
        </Button>
      </ButtonsEditMode>
    </header>

    <SectionHorarioDapeEditWeek v-model="weekSchedule" :commit="commit" />
  </UIContainer>
</template>

<style scoped>
h1.text.default {
  font-size: 1.125rem;
}

.schedule-query-back-wrapper {
  height: max-content;
  margin-block: auto;
}

.schedule-query-back-wrapper:hover {
  box-shadow: 0 0 0 5px rgb(0, 0, 0, 0.05);
  background-color: rgb(from var(--ladesa-grey-color) R G B / 15%);
}

:global(.dark) .schedule-query-back-wrapper:hover {
  box-shadow: 0 0 0 5px rgb(255, 255, 255, 0.04);
}

.schedule-query-back-icon {
  width: 1.375rem;
  color: var(--ladesa-grey-color);
}

.schedule-query-icon {
  width: 1rem;
}

.schedule-query-icon--flipped {
  transform: scaleX(-1);
}
</style>
