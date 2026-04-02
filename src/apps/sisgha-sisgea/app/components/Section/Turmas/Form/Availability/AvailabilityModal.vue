<script lang="ts" setup>
import { FormMode } from '~/utils/constants';
import WeekdaySelector from '../../../../UI/WeekDaySelector/WeekdaySelector.vue';
import ShiftTimes from './ShiftTimes/ShiftTimes.vue';
import WeekNavigator from './WeekNavigator.vue';
const props = defineProps<{
  turmaId?: string | null;
  mode?: FormMode;
  campusId?: string | null;
  disabled?: boolean;
  isLoading?: boolean;
}>();

const emit = defineEmits<{
  close: [];
  'update:editing': [value: boolean];
}>();
const onClose = () => emit('close');

const state = useTurmaAvailabilityState(
  computed(() => props.turmaId ?? null),
  computed(() => props.mode ?? FormMode.CREATE),
  computed(() => props.campusId ?? null)
);

const  {
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
  saveAvailability,
  hasPendingSave,
  invalidateDisponibilidade,
  weekQuery,
  allConfigsQuery,
  pendingDeactivations,
  addPendingDeactivation,
  undoPendingDeactivation,
  pendingConfigs,
  undoPendingConfig,
  currentWeekPending,
  hasGradeDivergence,
  showNavigationConfirm,
  confirmNavigationDiscard,
} = state;

watch(isEditing, val => emit('update:editing', val));

const showSaveConfirm = ref(false);

function handleConfirm(payload: { dataInicio: string; dataFim: string | null }) {
  confirmAvailability(payload);
  showSaveConfirm.value = false;
}

const dayjs = useDayJs();

function formatDate(iso: string): string {
  return dayjs(iso).format('DD/MM/YYYY');
}

function handleDeactivateConfig(configId: string) {
  addPendingDeactivation(configId);
}

function handleNavigateToConfig(dataInicio: string) {
  currentWeekRef.value = dayjs(dataInicio).startOf('week');
}

defineExpose({ saveAvailability, hasPendingSave, invalidateDisponibilidade });

const weekDayLabels = computed(() => weekDays.value.map(d => d.dayWeek));
const allConfigs = computed(() => allConfigsQuery.data.value?.configs ?? []);
const pendingConfigsList = computed(() => [...pendingConfigs.value.values()]);

function handleUndoPending(dataInicio: string) {
  undoPendingConfig(dataInicio);
}

const today = dayjs().format('YYYY-MM-DD');

function getConfigLabel(tipo: 'permanente' | 'temporario', dataInicio: string, dataFim?: string | null): string {
  if (tipo === 'permanente') {
    return dataInicio <= today
      ? `Permanente desde ${formatDate(dataInicio)}`
      : `Permanente a partir de ${formatDate(dataInicio)}`;
  }
  if (dataFim && dataFim < today) {
    return `Temporário entre ${formatDate(dataInicio)} e ${formatDate(dataFim)}`;
  }
  if (dataInicio <= today) {
    return `Temporário desde ${formatDate(dataInicio)} até ${formatDate(dataFim!)}`;
  }
  return `Temporário a partir de ${formatDate(dataInicio)} até ${formatDate(dataFim!)}`;
}
</script>

<template>
  <div class="flex">
    <DialogModalBaseLayout
      :close-button="false"
      :on-close="onClose"
      title="Disponibilidade"
      class="flex-1"
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

      <div v-else-if="isEditing || activeConfigInfo || currentWeekPending" class="flex flex-col gap-4">
        <!-- Config info chip (between week nav and day selector) -->
        <div
          v-if="currentWeekPending"
          class="w-full rounded-lg px-3 py-2 text-xs font-medium text-center border-2 border-dashed"
          :class="!currentWeekPending.data_fim
            ? 'border-ldsa-green-2/40 bg-ldsa-green-2/5 text-ldsa-green-2'
            : 'border-ldsa-blue/40 bg-ldsa-blue/5 text-ldsa-blue'"
        >
          Novo arranjo —
          {{ getConfigLabel(
            currentWeekPending.data_fim ? 'temporario' : 'permanente',
            currentWeekPending.data_inicio,
            currentWeekPending.data_fim,
          ) }}
        </div>
        <div
          v-else-if="activeConfigInfo"
          class="w-full rounded-lg px-3 py-2 text-xs font-medium text-center"
          :class="activeConfigInfo.tipo === 'permanente'
            ? 'bg-ldsa-green-2/10 text-ldsa-green-2'
            : 'bg-ldsa-blue/10 text-ldsa-blue'"
        >
          {{ getConfigLabel(activeConfigInfo.tipo, activeConfigInfo.dataInicio, activeConfigInfo.dataFim) }}
        </div>

        <WeekdaySelector
          v-model="selectedDayWeek"
          :items="weekDayLabels"
          class="font-semibold gap-2"
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
        <button
          type="button"
          class="editar-disponibilidade-button"
          :disabled="campusScheduleLoading || weekQuery.isFetching.value || props.disabled"
          @click="enterEditMode"
        >
          Editar disponibilidade
          <IconsEdit class="w-3.5 shrink-0" />
        </button>
      </template>

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

      <template #button-group>
        <template v-if="isEditing">
          <UIButtonModalCancel
            type="close"
            class="flex flex-1"
            @click="cancelEdit"
          />

          <UIButtonModalCommonButtonsGreenWithCheck
            text="Confirmar"
            class="flex-1"
            :disabled="!isDirty"
            @click.prevent="showSaveConfirm = true"
          />
        </template>
      </template>

      <!-- Save scope: permanente ou temporário -->
      <SectionTurmasFormAvailabilitySaveScopeModal
        v-model="showSaveConfirm"
        @confirm="handleConfirm"
        @close="showSaveConfirm = false"
      />

      <!-- Navigation confirmation when dirty -->
      <DialogConfirm
        v-model="showNavigationConfirm"
        message="Você tem alterações não salvas. Deseja descartá-las?"
        @confirm="confirmNavigationDiscard"
      />
    </DialogModalBaseLayout>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.editar-disponibilidade-button {
  @apply flex justify-center items-center gap-5 border-2 border-ldsa-grey
         text-ldsa-text-default py-2 rounded-lg w-full font-semibold
         hover:bg-ldsa-grey/15 active:bg-ldsa-grey/25 transition-colors
         disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
