<script lang="ts" setup>
import WeekdaySelector from '~/components/UI/WeekDaySelector/WeekdaySelector.vue';
import { capitalizeFirst } from '../../../Horario/-Helpers/CapitalizeFirst';
import { getWeekDays } from '../../../Horario/-Helpers/GetWeekDays';

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

const dayShifts = [
  {
    title: 'matutino',
    times: ['07:30', '08:20', '09:10', '10:00', '10:20', '11:10'],
  },
  {
    title: 'vespertino',
    times: ['13:00', '13:50', '14:40', '15:30', '15:50', '16:40'],
  },
  {
    title: 'noturno',
    times: ['19:00', '19:50', '20:40', '21:30', '21:50', '22:40'],
  },
];

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

function agruparHorarios(horarios: string[]) {
  const ordenados = [...horarios].sort();
  const blocos: string[] = [];

  for (let i = 0; i < ordenados.length; i++) {
    const inicio = ordenados[i];
    let fim = inicio;

    while (
      i + 1 < ordenados.length &&
      getProximoHorario(fim ?? '') === ordenados[i + 1]
    ) {
      fim = ordenados[++i];
    }

    blocos.push(
      inicio === fim ? (inicio ?? '') : `${inicio ?? ''}-${fim ?? ''}`
    );
  }

  return blocos;
}

function getProximoHorario(horario: string) {
  const todos = dayShifts.flatMap(s => s.times);
  const idx = todos.indexOf(horario);
  return todos[idx + 1] || null;
}

const currentDay = useCurrentDay();
const week = getWeekDays(currentDay.value);
const weekDays = week.map(day => day.dayWeek);

function formatarDia(dia: string): string {
  const diasComFeira = ['segunda', 'terça', 'quarta', 'quinta', 'sexta'];
  return diasComFeira.includes(dia.toLowerCase()) ? `${dia}-feira` : dia;
}
const onClose = () => emit('fechar');
</script>

<template>
  <DialogModalBaseLayout
    :close-button="false"
    :on-close="onClose"
    title="Editar motivos de indisponibilidade"
    class="mr-3 h-[35rem] max-w-full"
  >
    <div>
      <VVAutocomplete
        :items="['Licença médica', 'Atividade externa', 'Reunião', 'Outro']"
        v-model="novoMotivo"
        placeholder="Digite ou selecione um novo motivo"
        label="Motivo"
        name="motivo"
        class="w-full text-sm mt-1"
      />

      <div class="mt-4 space-y-2 text-sm">
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
              agruparHorarios(props.motivoAtual.horariosPorDia[dia] || []).join(
                ', '
              )
            }}
          </span>
        </div>
      </div>
    </div>

    <template #button-group>
      <UIButtonModalCancel @click="emit('fechar')" />
      <UIButtonModalDelete @click="emit('deletar', props.motivoAtual.motivo)" />
      <UIButtonModalSave :disabled="!podeSalvar" @click="salvarAlteracoes" />
    </template>
  </DialogModalBaseLayout>

  <DialogModalBaseLayout
    :close-button="false"
    :on-close="onClose"
    title="Editar horários do motivo"
    class="h-[35rem] max-w-full"
  >
    <div>
      <WeekdaySelector
        :items="weekDays"
        v-model="selectedDayWeek"
        class="font-semibold mb-4"
      />

      <section class="flex justify-between">
        <div v-for="shift in dayShifts" :key="shift.title">
          <h3 class="text-sm font-medium text-ldsa-text-default mb-2">
            {{ capitalizeFirst(shift.title) }}
          </h3>
          <UICheckbox :items="shift.times" v-model="horariosSelecionados" />
        </div>
      </section>
    </div>
  </DialogModalBaseLayout>
</template>