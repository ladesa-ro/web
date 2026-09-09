<script lang="ts" setup>
import WeekdaySelector from '~/components/UI/WeekDaySelector/WeekdaySelector.vue';
import { capitalizeFirst } from '@ladesa-ro/web.utils';
import { getWeekDays } from '~/utils/get-week-days';
import { dayShifts, motivosDisponiveis } from './-Helpers/motivos-utils';

const props = defineProps<{
  horariosSemMotivo: string[];
}>();

watch(
  () => props.horariosSemMotivo,
  val => {
    console.log('horariosSemMotivo:', val);
  },
  { immediate: true }
);

const emit = defineEmits<{
  (e: 'fechar'): void;
  (e: 'cadastrar', dia: string, horario: string, motivo: string): void;
}>();

const selectedTimes = ref<string[]>([]);
const motivos = ref<Record<string, string>>({});
const pendentes = ref<{ horario: string; motivo: string }[]>([]);

const currentDay = useCurrentDay();
const week = getWeekDays(currentDay.value);
const weekDays = week.map(day => day.dayWeek);
const selectedDayWeek = ref<string>(weekDays[0] ?? 'segunda');

const podeRegistrar = computed(
  () =>
    selectedTimes.value.length > 0 &&
    selectedTimes.value.every(h => (motivos.value[h] ?? '').trim().length > 0)
);

function registrarMotivos() {
  selectedTimes.value.forEach(horario => {
    const motivo = motivos.value[horario]?.trim();
    if (motivo && !pendentes.value.some(m => m.horario === horario)) {
      pendentes.value.push({ horario, motivo });
    }
  });
  selectedTimes.value = [];
  motivos.value = {};
}

function confirmarTodos() {
  pendentes.value.forEach(m => {
    emit('cadastrar', selectedDayWeek.value, m.horario, m.motivo);
  });
  emit('fechar');
}

function cancelarTodos() {
  pendentes.value = [];
}

function excluirMotivo(horario: string) {
  pendentes.value = pendentes.value.filter(m => m.horario !== horario);
}

const onClose = () => emit('fechar');
</script>

<template>
  <div class="modal-cadastrar-motivo__wrapper u-flex u-flex-col u-gap-4">
    <DialogModalBaseLayout
      :close-button="false"
      :on-close="onClose"
      title="Cadastrar Motivos de Indisponibilidade"
      class="modal-cadastrar-motivo__panel"
    >
      <div
        v-if="props.horariosSemMotivo.length === 0"
        class="modal-cadastrar-motivo__empty u-text-center u-text-sm"
      >
        Todos os horários já possuem um motivo.
      </div>

      <form
        v-else
        class="u-flex u-flex-col u-gap-5"
        @submit.prevent="registrarMotivos"
      >
        <WeekdaySelector
          v-model="selectedDayWeek"
          :items="weekDays"
          class="u-font-semibold u-mb-1"
        />

        <section
          class="u-flex u-flex-row u-flex-wrap u-gap-3 u-justify-between u-w-full"
        >
          <div
            v-for="shift in dayShifts"
            :key="shift.title"
            class="modal-cadastrar-motivo__shift u-flex-1"
          >
            <h1 class="modal-cadastrar-motivo__shift-title u-mb-2">
              {{ capitalizeFirst(shift.title) }}
            </h1>
            <UICheckbox
              v-model="selectedTimes"
              :items="shift.times"
              :disabled-items="
                shift.times.filter(
                  time => !props.horariosSemMotivo.includes(time)
                )
              "
              class="nunito"
            />
          </div>
        </section>

        <div v-if="selectedTimes.length > 0" class="u-flex u-flex-col u-gap-4">
          <div
            v-for="horario in selectedTimes"
            :key="horario"
            class="u-flex u-flex-col u-gap-2 u-w-full"
          >
            <label class="modal-cadastrar-motivo__label u-text-xs u-font-medium"
              >Motivo para {{ horario }}</label
            >

            <VVAutocomplete
              v-model="motivos[horario]"
              :items="motivosDisponiveis"
              placeholder="Digite ou selecione um motivo"
              label="Motivo"
              name="motivo"
              class="u-w-full u-text-xs"
            />
          </div>

          <button
            type="submit"
            :disabled="!podeRegistrar"
            class="modal-cadastrar-motivo__submit u-flex u-justify-between u-items-center u-gap-2 u-px-3 u-py-3-5 u-rounded-lg u-w-full u-text-xs u-font-medium"
          >
            Registrar motivo para horário selecionado
            <IconsConfirm class="modal-cadastrar-motivo__submit-icon" />
          </button>
        </div>
      </form>

      <template #button-group>
        <div
          class="modal-cadastrar-motivo__actions u-flex u-flex-col u-justify-start u-w-full u-gap-2"
        >
          <UIButtonModalGoBack @click="emit('fechar')" />
        </div>
      </template>
    </DialogModalBaseLayout>

    <DialogModalBaseLayout
      :close-button="false"
      :on-close="onClose"
      title="Motivos pendentes de confirmação"
      class="modal-cadastrar-motivo__pending-panel"
    >
      <div
        v-if="pendentes.length === 0"
        class="modal-cadastrar-motivo__empty u-flex u-items-center u-justify-center u-text-center u-text-sm"
      >
        Ainda não há motivos pendentes de confirmação
      </div>

      <ul v-else class="modal-cadastrar-motivo__pending-list u-text-sm">
        <SectionUsuariosFormMotivosFormPendingItem
          v-for="m in pendentes"
          :key="m.horario"
          :motivo="m.motivo"
          :horario="m.horario"
          @remove="excluirMotivo(m.horario)"
        />
      </ul>

      <template #button-group>
        <UIButtonModalDelete
          :disabled="pendentes.length === 0"
          @click="cancelarTodos"
        />
        <UIButtonModalSave
          :disabled="pendentes.length === 0"
          @click="confirmarTodos"
        />
      </template>
    </DialogModalBaseLayout>
  </div>
</template>

<style scoped>
.modal-cadastrar-motivo__wrapper {
  height: min(90vh, 100%);
  width: min(95vw, 50rem);
}

@media (min-width: 768px) {
  .modal-cadastrar-motivo__wrapper {
    flex-direction: row;
  }
}

.modal-cadastrar-motivo__panel {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .modal-cadastrar-motivo__panel {
    width: 50%;
  }
}

.modal-cadastrar-motivo__pending-panel {
  width: 100%;
  height: auto;
  max-height: 90vh;
  overflow-x: hidden;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .modal-cadastrar-motivo__pending-panel {
    width: 50%;
  }
}

.modal-cadastrar-motivo__empty {
  color: var(--ladesa-grey-color);
}

.modal-cadastrar-motivo__shift {
  min-width: 5rem;
  max-width: 7.5rem;
  overflow-x: hidden;
}

.modal-cadastrar-motivo__shift-title {
  color: var(--ladesa-text-default-color);
}

.modal-cadastrar-motivo__label {
  color: var(--ladesa-grey-color);
}

.modal-cadastrar-motivo__submit {
  border: 2px solid var(--ladesa-green-1-color);
  color: var(--ladesa-green-1-color);
}

.modal-cadastrar-motivo__submit:hover {
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 10%);
}

.modal-cadastrar-motivo__submit:disabled {
  opacity: var(--ui-disabled-opacity);
  cursor: not-allowed;
}

.modal-cadastrar-motivo__submit-icon {
  width: 1rem;
  height: 1rem;
}

@media (min-width: 640px) {
  .modal-cadastrar-motivo__actions {
    flex-direction: row;
  }
}

.modal-cadastrar-motivo__pending-list > * + * {
  margin-top: var(--ui-space-2);
}
</style>
