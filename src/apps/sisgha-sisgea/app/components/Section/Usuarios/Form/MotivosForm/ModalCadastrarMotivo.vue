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
  <div
    class="flex flex-col gap-4 md:flex-row h-[min(90vh,100%)] w-[min(95vw,50rem)]"
  >
    <DialogModalBaseLayout
      :close-button="false"
      :on-close="onClose"
      title="Cadastrar Motivos de Indisponibilidade"
      class="w-full md:w-1/2 h-full overflow-x-hidden overflow-y-auto"
    >
      <div
        v-if="props.horariosSemMotivo.length === 0"
        class="text-center text-sm text-ldsa-grey"
      >
        Todos os horários já possuem um motivo.
      </div>

      <form
        v-else
        class="flex flex-col gap-5"
        @submit.prevent="registrarMotivos"
      >
        <WeekdaySelector
          v-model="selectedDayWeek"
          :items="weekDays"
          class="font-semibold mb-1"
        />

        <!-- checkbox de horários -->
        <section class="flex flex-row flex-wrap gap-3 justify-between w-full">
          <div
            v-for="shift in dayShifts"
            :key="shift.title"
            class="flex-1 min-w-[80px] max-w-[120px] overflow-x-hidden"
          >
            <h1 class="mb-2 text-ldsa-text-default">
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

        <!-- inputs de motivo -->
        <div v-if="selectedTimes.length > 0" class="flex flex-col gap-4">
          <div
            v-for="horario in selectedTimes"
            :key="horario"
            class="flex flex-col gap-2 w-full"
          >
            <label class="text-xs font-medium text-ldsa-grey"
              >Motivo para {{ horario }}</label
            >

            <VVAutocomplete
              v-model="motivos[horario]"
              :items="motivosDisponiveis"
              placeholder="Digite ou selecione um motivo"
              label="Motivo"
              name="motivo"
              class="w-full text-xs"
            />
          </div>

          <button
            type="submit"
            :disabled="!podeRegistrar"
            class="flex justify-between items-center gap-2 border-2 border-ldsa-green-1 text-ldsa-green-1 px-3 py-3.5 rounded-lg w-full text-xs font-medium hover:bg-ldsa-green-1/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Registrar motivo para horário selecionado
            <IconsConfirm class="w-4 h-4" />
          </button>
        </div>
      </form>

      <template #button-group>
        <div class="flex flex-col sm:flex-row justify-start w-full gap-2">
          <UIButtonModalGoBack @click="emit('fechar')" />
        </div>
      </template>
    </DialogModalBaseLayout>

    <DialogModalBaseLayout
      :close-button="false"
      :on-close="onClose"
      title="Motivos pendentes de confirmação"
      class="w-full md:w-1/2 max-h-[90vh] h-auto overflow-x-hidden overflow-y-auto"
    >
      <div
        v-if="pendentes.length === 0"
        class="flex items-center justify-center text-center text-sm text-ldsa-grey"
      >
        Ainda não há motivos pendentes de confirmação
      </div>

      <ul v-else class="space-y-2 text-sm">
        <li
          v-for="m in pendentes"
          :key="m.horario"
          class="flex justify-between items-center py-3 border-b-1 border-ldsa-grey"
        >
          <div class="flex justify-between w-full items-center">
            <span class="font-semibold text-sm text-ldsa-text-default">{{
              m.motivo
            }}</span>

            <div class="flex items-center gap-2">
              <span class="font-medium text-sm text-ldsa-grey">{{
                m.horario
              }}</span>

              <button
                class="text-ldsa-red hover:text-ldsa-red/75"
                aria-label="Excluir motivo"
                @click="excluirMotivo(m.horario)"
              >
                <IconsExclude class="w-3 h-3" />
              </button>
            </div>
          </div>
        </li>
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
