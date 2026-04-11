<script lang="ts" setup>
import WeekdaySelector from '~/components/UI/WeekDaySelector/WeekdaySelector.vue';
import { capitalizeFirst } from '@ladesa-ro/web.utils';
import { getWeekDays } from '~/utils/get-week-days';
import {
  dayShifts,
  motivosDisponiveis,
  formatarDia,
  agruparHorarios,
} from './-Helpers/motivos-utils';

const props = defineProps<{
  motivoAtual: {
    motivo: string;
    dias: string[];
    horariosPorDia: Record<string, string[]>;
  };
}>();

const emit = defineEmits<{
  (e: 'fechar'): void;
  (e: 'deletar', motivo: string): void;
  (
    e: 'atualizarComHorarios',
    payload: { horariosPorDia: Record<string, string[]>; motivo: string }
  ): void;
}>();

const novoMotivo = ref(props.motivoAtual.motivo);
const selectedDayWeek = ref(props.motivoAtual.dias[0] || '');

const horariosSelecionados = ref<string[]>([
  ...(props.motivoAtual.horariosPorDia[selectedDayWeek.value] || []),
]);

watch(selectedDayWeek, novoDia => {
  horariosSelecionados.value = [
    ...(props.motivoAtual.horariosPorDia[novoDia] || []),
  ];
});

const podeSalvar = computed(() => !!novoMotivo.value.trim());

function salvarAlteracoes() {
  const horariosPorDiaAtualizado = { ...props.motivoAtual.horariosPorDia };
  horariosPorDiaAtualizado[selectedDayWeek.value] = [
    ...horariosSelecionados.value,
  ];

  emit('atualizarComHorarios', {
    horariosPorDia: horariosPorDiaAtualizado,
    motivo: novoMotivo.value.trim(),
  });
}

const currentDay = useCurrentDay();
const week = getWeekDays(currentDay.value);
const weekDays = week.map(day => day.dayWeek);

const onClose = () => emit('fechar');
</script>

<template>
  <div
    class="flex flex-col gap-4 md:flex-row md:gap-4 h-[min(90vh,100%)] w-[min(95vw,50rem)]"
  >
    <DialogModalBaseLayout
      :close-button="false"
      :on-close="onClose"
      title="Editar motivos de indisponibilidade"
      class="flex-1 h-full overflow-x-hidden overflow-y-auto p-4"
    >
      <div>
        <VVAutocomplete
          v-model="novoMotivo"
          :items="motivosDisponiveis"
          placeholder="Digite ou selecione um novo motivo"
          label="Motivo"
          name="motivo"
          class="w-full text-sm mt-1"
        />

        <div class="mt-4 text-sm">
          <div
            v-for="dia in props.motivoAtual.dias"
            :key="dia"
            class="flex justify-between border-b border-ldsa-grey py-2"
          >
            <span class="capitalize font-semibold text-ldsa-text-default">
              {{ formatarDia(dia) }}
            </span>
            <span class="text-right text-ldsa-text-default">
              {{
                agruparHorarios(
                  props.motivoAtual.horariosPorDia[dia] || []
                ).join(', ')
              }}
            </span>
          </div>
        </div>
      </div>

      <template #button-group>
        <UIButtonModalCancel
          @click="emit('fechar')"
        />
        <UIButtonModalDelete
          @click="emit('deletar', props.motivoAtual.motivo)"
        />
        <UIButtonModalSave
          :disabled="!podeSalvar"
          @click="salvarAlteracoes"
        />
      </template>
    </DialogModalBaseLayout>

    <DialogModalBaseLayout
      :close-button="false"
      :on-close="onClose"
      title="Editar motivos de indisponibilidade"
      class="flex-1 max-h-[90vh] h-auto overflow-x-hidden overflow-y-auto p-4"
    >
      <div>
        <WeekdaySelector
          v-model="selectedDayWeek"
          :items="weekDays"
          class="font-semibold mb-4"
        />

        <section class="flex flex-row flex-wrap gap-3 justify-between w-full">
          <div
            v-for="shift in dayShifts"
            :key="shift.title"
            class="flex-1 min-w-[80px] max-w-[120px] overflow-x-hidden"
          >
            <h3 class="mb-2 text-ldsa-text-default">
              {{ capitalizeFirst(shift.title) }}
            </h3>
            <UICheckbox
              v-model="horariosSelecionados"
              :items="shift.times"
              class="nunito"
            />
          </div>
        </section>
      </div>
    </DialogModalBaseLayout>
  </div>
</template>
