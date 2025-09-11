<script lang="ts" setup>
import { capitalizeFirst } from '../../../../Horario/-Helpers/CapitalizeFirst';
import type { Vinculo } from '../../FormUtils';
import { useAvailability } from '../../../../../../composables/useAvailability';

const props = defineProps<{
  vinculo: Vinculo;
  selectedDayWeek: string;
  motivosConfirmados: Record<string, { horario: string; motivo: string }[]>;
}>();

const emit = defineEmits<{
  (
    e: 'abrir-modal',
    tipo: 'cadastrar' | 'consultar' | 'listar' | 'editar',
    payload?: any
  ): void;
  (e: 'atualizar-horarios-sem-motivo', horarios: string[]): void;
  (
    e: 'atualizar-motivos',
    motivos: Record<string, { horario: string; motivo: string }[]>
  ): void;
  (e: 'atualizar-dia-selecionado', dia: string): void;
}>();

const {
  composables: { useFindOneQuery },
} = useLadesaApiCrudCampi();

const { data: campus, suspense } = useFindOneQuery(props.vinculo.campus.id);

const { dayShifts, selectedDayWeek: selectedDay, selectedTimes, availabilityByDay } = useAvailability();

watch(
  () => props.selectedDayWeek,
  novoDia => {
    selectedDay.value = novoDia;
  },
  { immediate: true }
);

watch(selectedTimes, novos => {
  availabilityByDay.value[selectedDay.value] = [...novos];
});

await suspense();

const motivosIndisponibilidade = ref<
  Record<string, { horario: string; motivo: string }[]>
>({});

watch(
  () => props.motivosConfirmados,
  novo => {
    motivosIndisponibilidade.value = { ...novo };
  },
  { immediate: true, deep: true }
);

const allTimes = dayShifts.flatMap(s => s.times);

const motivosDoDia = computed(() => {
  return motivosIndisponibilidade.value[selectedDay.value] || [];
});

const horariosIndisponiveis = computed(() =>
  allTimes.filter(time => !selectedTimes.value.includes(time))
);

const horariosSemMotivo = computed(() =>
  horariosIndisponiveis.value.filter(
    time => !motivosDoDia.value.some(m => m.horario === time)
  )
);

const mostrarBotaoCadastrarMotivo = computed(
  () => horariosSemMotivo.value.length > 0
);

watch(
  motivosIndisponibilidade,
  novosMotivos => emit('atualizar-motivos', novosMotivos),
  { deep: true }
);

watch(
  horariosSemMotivo,
  novos => emit('atualizar-horarios-sem-motivo', novos),
  { immediate: true }
);

watch(
  selectedDay,
  novo => emit('atualizar-dia-selecionado', novo),
  { immediate: true }
);

//

const collapsibleOpen = ref(true);
</script>

<template>
  <UICollapsible
    v-model="collapsibleOpen"
    class="border-2 border-ldsa-grey rounded-lg"
  >
    <template #trigger>
      <div
        class="flex items-center justify-between p-5 hover:bg-ldsa-grey/10 font-medium"
      >
        {{ campus?.apelido }}

        <IconsArrow
          class="text-ldsa-text-green transition-[rotate]"
          :class="collapsibleOpen ? 'rotate-90' : '-rotate-90'"
        />
      </div>
    </template>

    <div class="m-5 mt-2 flex flex-col gap-9">
      <section class="flex justify-between">
        <div v-for="shift in dayShifts" :key="shift.title">
          <h1 class="font-medium mb-2">{{ capitalizeFirst(shift.title) }}</h1>
          <UICheckbox
            v-model="selectedTimes"
            :items="shift.times"
            class="nunito w-full max-w-full"
          />
        </div>
      </section>

      <div v-if="mostrarBotaoCadastrarMotivo">
        <UIAlert
          type="warning"
          message="Há horários cuja indisponibilidade ainda não foi justificada"
          class="mb-4"
        />

        <button
          class="flex justify-between items-center gap-2 border-2 border-ldsa-green-1 text-ldsa-green-1 px-9 py-3 rounded-lg w-full text-sm font-semibold hover:bg-ldsa-green-1/10"
          @click="$emit('abrir-modal', 'cadastrar')"
        >
          Cadastrar motivos de indisponibilidade
          <IconsAdd class="w-4 h-4" />
        </button>
      </div>

      <div>
        <UITitle
          variant="mini"
          text="Motivos de indisponibilidade"
          class="pb-5"
        />

        <div class="flex max-sm:flex-col gap-4 justify-between">
          <button
            class="indisponibilidade-button"
            @click="$emit('abrir-modal', 'consultar')"
          >
            Consultar
            <IconsEyeOn class="w-5 shrink-0" />
          </button>

          <button
            class="indisponibilidade-button"
            @click="$emit('abrir-modal', 'listar')"
          >
            Editar
            <IconsEdit class="w-3.5 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  </UICollapsible>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.indisponibilidade-button {
  @apply flex justify-center items-center gap-5 border-2 border-ldsa-grey text-ldsa-text-default py-2 rounded-lg w-full font-semibold hover:bg-ldsa-grey/15 active:bg-ldsa-grey/25 transition-colors;
}
</style>
