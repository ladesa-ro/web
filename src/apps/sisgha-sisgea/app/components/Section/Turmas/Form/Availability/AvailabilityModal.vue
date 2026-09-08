<script lang="ts" setup>
import ConfirmContent from '../../../../Dialog/Confirm/ConfirmContent.vue';
import WeekdaySelector from '../../../../UI/WeekDaySelector/WeekdaySelector.vue';
import SaveScope from './SaveScope.vue';
import ShiftTimes from './ShiftTimes/ShiftTimes.vue';
import WeekNavigator from './WeekNavigator.vue';

import { FormMode } from '~/utils/constants';

const props = defineProps<{
  disabled?: boolean;
  isLoading?: boolean;
  mode?: FormMode;
  turmaId?: string | null;
}>();

const emit = defineEmits<{
  close: [];
  'open-evento-create': [];
  'open-evento-edit': [id: string];
}>();
const onClose = () => emit('close');

const {
  currentWeekRef,
  weekDays,
  weekLabel,
  isPastWeek,
  goToPrevWeek,
  goToNextWeek,
  campusGrades,
  selectedGradeIdentifier,
  activeConfigInfo,
  campusShifts,
  campusScheduleLoading,
  isEditing,
  selectedDayWeek,
  selectedTimes,
  isDirty,
  enterEditMode,
  cancelEdit,
  confirmAvailability,
  weekQuery,
  allConfigsQuery,
  pendingDeactivations,
  addPendingDeactivation,
  undoPendingDeactivation,
  pendingConfigs,
  undoPendingConfig,
  currentWeekPending,
  hasGradeDivergence,
  setOnNavigationBlocked,
  confirmNavigationDiscard,
} = useInjectTurmaAvailability();

type TurmaAvailModal = 'saveScope' | 'navConfirm';
const modals = useModalManager<TurmaAvailModal>({
  modals: {
    saveScope: { exclusive: false },
    navConfirm: { exclusive: false },
  },
});

setOnNavigationBlocked(() => modals.open('navConfirm'));

function handleConfirm(payload: {
  dataInicio: string;
  dataFim: string | null;
}) {
  confirmAvailability(payload);
  modals.close('saveScope');
}

function handleNavigationConfirm() {
  modals.close('navConfirm');
  confirmNavigationDiscard();
}

const dayjs = useDayJs();

function handleDeactivateConfig(configId: string) {
  addPendingDeactivation(configId);
}

function handleNavigateToConfig(dataInicio: string) {
  currentWeekRef.value = dayjs(dataInicio).startOf('week');
}

const weekDayLabels = computed(() => weekDays.value.map(d => d.dayWeek));
const allConfigs = computed(() => allConfigsQuery.data.value?.configs ?? []);
const pendingConfigsList = computed(() => [...pendingConfigs.value.values()]);

function handleUndoPending(dataInicio: string) {
  undoPendingConfig(dataInicio);
}
</script>

<template>
  <div class="u-flex u-h-full">
    <DialogModalBaseLayout
      :close-button="false"
      :on-close="onClose"
      title="Disponibilidade"
      class="u-flex-1"
      content-class="availability-content"
    >
      <WeekNavigator
        :week-label="weekLabel"
        :hide-buttons="isEditing"
        @prev="goToPrevWeek"
        @next="goToNextWeek"
      />

      <template v-if="isEditing || activeConfigInfo || currentWeekPending">
        <SectionTurmasFormAvailabilityGradeSelector
          v-if="campusGrades.length > 1 || isEditing"
          :grades="campusGrades"
          :selected-identifier="selectedGradeIdentifier"
          :is-editing="isEditing"
          :disabled="isPastWeek"
          @update:selected-identifier="selectedGradeIdentifier = $event"
        />

        <UIAlert
          v-if="isEditing && hasGradeDivergence && !isPastWeek"
          type="warning"
          message="Esta turma possui configurações baseadas em uma grade de horários anterior. Ao editar, os horários serão redefinidos."
        />
      </template>

      <UILoading v-if="weekQuery.isLoading.value" />

      <div
        v-else-if="isEditing || activeConfigInfo || currentWeekPending"
        class="u-flex u-flex-col u-gap-4"
      >
        <WeekdaySelector
          v-model="selectedDayWeek"
          :items="weekDayLabels"
          mode="compact"
          class="u-font-semibold u-gap-2"
        />

        <ShiftTimes
          :key="selectedGradeIdentifier ?? ''"
          :day-shifts="campusShifts"
          :selected-times="selectedTimes"
          :disabled="!isEditing"
          @update:selected-times="selectedTimes = $event"
        />
      </div>

      <UIAlert
        v-if="isPastWeek"
        type="info"
        message="Semanas passadas não podem ser editadas."
      />

      <template v-if="!isEditing && !isPastWeek">
        <!-- Config list (view mode, after edit button) -->
        <SectionTurmasFormAvailabilityConfigList
          v-if="!isEditing"
          :configs="allConfigs"
          :pending-configs="pendingConfigsList"
          :pending-deactivation-ids="[...pendingDeactivations]"
          :is-loading="allConfigsQuery.isLoading.value"
          :disabled="props.disabled"
          @navigate-to="handleNavigateToConfig"
          @deactivate="handleDeactivateConfig"
          @undo-deactivation="undoPendingDeactivation"
          @undo-pending="handleUndoPending"
        />

        <button
          type="button"
          class="editar-disponibilidade-button"
          :disabled="
            campusScheduleLoading ||
            weekQuery.isFetching.value ||
            props.disabled
          "
          @click="enterEditMode"
        >
          Editar Horários de Aula
          <IconsEdit class="edit-icon u-shrink-0" />
        </button>
      </template>

      <!-- Eventos da turma -->
      <SectionTurmasFormEventosSection
        v-if="!isEditing && props.mode === FormMode.MANAGE"
        :disabled="props.disabled"
        :mode="props.mode"
        :turma-id="props.turmaId"
        @open-create="emit('open-evento-create')"
        @open-edit="(id: string) => emit('open-evento-edit', id)"
      />

      <template #button-group>
        <template v-if="isEditing">
          <UIButtonModalCancel type="close" @click="cancelEdit" />

          <UIButtonModalCommonButtonsGreenWithCheck
            text="Confirmar"
            :disabled="!isDirty"
            @click.prevent="modals.open('saveScope')"
          />
        </template>
      </template>

      <!-- Save scope: permanente ou temporário -->
      <DialogManagedDialog
        name="saveScope"
        :manager="modals"
        backdrop-action="close-self"
      >
        <SaveScope
          @confirm="handleConfirm"
          @close="modals.close('saveScope')"
        />
      </DialogManagedDialog>

      <!-- Navigation confirmation when dirty -->
      <DialogManagedDialog
        name="navConfirm"
        :manager="modals"
        backdrop-action="close-self"
      >
        <ConfirmContent
          message="Você tem alterações não salvas. Deseja descartá-las?"
          @confirm="handleNavigationConfirm"
          @cancel="modals.close('navConfirm')"
        />
      </DialogManagedDialog>
    </DialogModalBaseLayout>
  </div>
</template>

<style scoped>
:deep(.availability-content) {
  gap: var(--ui-space-4) !important;
}

.editar-disponibilidade-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--ui-space-5);
  width: 100%;
  padding-block: var(--ui-space-1);
  border: 2px solid var(--ladesa-grey-color);
  border-radius: var(--ui-radius-lg);
  color: var(--ladesa-text-default-color);
  font-size: 0.875rem;
  font-weight: var(--ui-font-weight-semibold);
  transition: background-color var(--ui-duration-base) var(--ui-easing-standard);
}

.editar-disponibilidade-button:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 15%);
}

.editar-disponibilidade-button:active {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 25%);
}

.editar-disponibilidade-button:disabled {
  opacity: var(--ui-disabled-opacity);
  cursor: not-allowed;
}

.edit-icon {
  width: 0.875rem;
}
</style>
