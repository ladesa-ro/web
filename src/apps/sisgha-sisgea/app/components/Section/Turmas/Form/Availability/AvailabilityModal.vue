<script lang="ts" setup>
import { FormMode } from '~/utils/constants';
import WeekdaySelector from '../../../../UI/WeekDaySelector/WeekdaySelector.vue';
import ShiftTimes from './ShiftTimes/ShiftTimes.vue';
import WeekNavigator from './WeekNavigator.vue';
import ModalBaseLayout from '../../../../Dialog/Modal/ModalBaseLayout.vue';

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

const {
  weekDays,
  weekLabel,
  isPastWeek,
  goToPrevWeek,
  goToNextWeek,
  campusShifts,
  campusScheduleLoading,
  isEditing,
  selectedDayWeek,
  selectedTimes,
  isDirty,
  enterEditMode,
  cancelEdit,
  saveAvailability,
  hasGradeDivergence,
  showNavigationConfirm,
  confirmNavigationDiscard,
} = useTurmaAvailabilityState(
  computed(() => props.turmaId ?? null),
  computed(() => props.mode ?? FormMode.CREATE),
  computed(() => props.campusId ?? null)
);

watch(isEditing, val => emit('update:editing', val));

const showSaveConfirm = ref(false);
const isSaving = ref(false);

async function handleSave(aplicarFuturas: boolean) {
  isSaving.value = true;
  try {
    await saveAvailability(aplicarFuturas);
  } finally {
    isSaving.value = false;
    showSaveConfirm.value = false;
  }
}

const weekDayLabels = computed(() => weekDays.value.map(d => d.dayWeek));
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
        @prev="goToPrevWeek"
        @next="goToNextWeek"
      />

      <UIAlert
        v-if="hasGradeDivergence && !isPastWeek"
        type="warning"
        message="Esta turma possui configurações baseadas em uma grade de horários anterior. Ao editar, os horários serão redefinidos."
      />

      <UIAlert
        v-if="isEditing"
        type="info"
        message="A disponibilidade será salva ao confirmar o cadastro/edição da turma."
      />

      <div class="flex flex-col gap-4">
        <WeekdaySelector
          :items="weekDayLabels"
          v-model="selectedDayWeek"
          class="font-semibold gap-2"
        />

        <ShiftTimes
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
          :disabled="campusScheduleLoading || props.disabled"
          @click="enterEditMode"
        >
          Editar disponibilidade
          <IconsEdit class="w-3.5 shrink-0" />
        </button>
      </template>

      <template #button-group>
        <template v-if="isEditing">
          <UIButtonModalCancel
            @click="cancelEdit"
            type="close"
            class="flex flex-1"
          />

          <UIButtonModalCommonButtonsGreenWithCheck
            text="Confirmar"
            class="flex-1"
            :disabled="!isDirty || isSaving"
            @click.prevent="showSaveConfirm = true"
          />
        </template>
      </template>

      <!-- Save confirmation: apply to current week only or current + future -->
      <DialogSkeleton v-model="showSaveConfirm">
        <ModalBaseLayout
          title="Confirmar"
          :close-button="true"
          :on-close="() => (showSaveConfirm = false)"
          class="!sm:max-w-[38rem]"
        >
          <p class="text-ldsa-grey text-center mx-auto break-words">
            Aplicar alterações apenas nesta semana ou nesta e nas futuras?
          </p>

          <template #button-group>
            <UIButtonModalBaseLayout
              text="Apenas esta semana"
              color="var(--ladesa-green-1-color)"
              type="button"
              class="flex-1 whitespace-nowrap"
              :disabled="isSaving"
              @click="handleSave(false)"
            />
            <UIButtonModalCommonButtonsGreenWithCheck
              text="Esta e futuras"
              class="flex-1 whitespace-nowrap"
              :disabled="isSaving"
              @click.prevent="handleSave(true)"
            />
          </template>
        </ModalBaseLayout>
      </DialogSkeleton>

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
