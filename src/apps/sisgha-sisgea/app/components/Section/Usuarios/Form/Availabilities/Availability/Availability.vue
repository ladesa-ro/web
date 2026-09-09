<script lang="ts" setup>
import { capitalizeFirst } from '@ladesa-ro/web.utils';
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

const campi_api = useCampi();

const campusQuery = campi_api.findOne(ref(props.vinculo.campus.id));

const campus = campusQuery.data;

const {
  dayShifts,
  selectedDayWeek: selectedDay,
  selectedTimes,
  availabilityByDay,
} = useAvailability();

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

await suspendQuery(campusQuery);

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

watch(selectedDay, novo => emit('atualizar-dia-selecionado', novo), {
  immediate: true,
});

const collapsibleOpen = ref(true);
</script>

<template>
  <UICollapsible v-model="collapsibleOpen" class="availability u-rounded-lg">
    <template #trigger>
      <div
        class="availability__trigger u-flex u-items-center u-justify-between u-p-5 u-font-medium"
      >
        {{ campus?.apelido }}

        <IconsArrow
          class="availability__arrow"
          :class="
            collapsibleOpen
              ? 'availability__arrow--open'
              : 'availability__arrow--closed'
          "
        />
      </div>
    </template>

    <div class="availability__body u-flex u-flex-col u-m-5 u-mt-2">
      <section class="u-flex u-justify-between">
        <div v-for="shift in dayShifts" :key="shift.title">
          <h1 class="u-font-medium u-mb-2">
            {{ capitalizeFirst(shift.title) }}
          </h1>
          <UICheckbox
            v-model="selectedTimes"
            :items="shift.times"
            class="nunito availability__checkbox u-w-full"
          />
        </div>
      </section>

      <div v-if="mostrarBotaoCadastrarMotivo">
        <UIAlert
          type="warning"
          message="Há horários cuja indisponibilidade ainda não foi justificada"
          class="u-mb-4"
        />

        <button
          class="availability__cta u-flex u-justify-between u-items-center u-gap-2 u-py-3 u-rounded-lg u-w-full u-text-sm u-font-semibold"
          @click="$emit('abrir-modal', 'cadastrar')"
        >
          Cadastrar motivos de indisponibilidade
          <IconsAdd class="availability__cta-icon" />
        </button>
      </div>

      <div>
        <UITitle
          variant="mini"
          text="Motivos de indisponibilidade"
          class="u-pb-5"
        />

        <div class="availability__reasons-row u-flex u-gap-4 u-justify-between">
          <button
            class="indisponibilidade-button u-flex u-justify-center u-items-center u-gap-5 u-py-2 u-rounded-lg u-w-full u-font-semibold"
            @click="$emit('abrir-modal', 'consultar')"
          >
            Consultar
            <IconsEyeOn class="availability__reason-icon--eye u-shrink-0" />
          </button>

          <button
            class="indisponibilidade-button u-flex u-justify-center u-items-center u-gap-5 u-py-2 u-rounded-lg u-w-full u-font-semibold"
            @click="$emit('abrir-modal', 'listar')"
          >
            Editar
            <IconsEdit class="availability__reason-icon--edit u-shrink-0" />
          </button>
        </div>
      </div>
    </div>
  </UICollapsible>
</template>

<style scoped>
.availability {
  border: 2px solid var(--ladesa-grey-color);
}

.availability__trigger:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.availability__arrow {
  color: var(--ladesa-text-green-color);
  transition: rotate var(--ui-duration-fast) var(--ui-easing-standard);
}

.availability__arrow--open {
  rotate: 90deg;
}

.availability__arrow--closed {
  rotate: -90deg;
}

.availability__body {
  gap: 2.25rem;
}

.availability__checkbox {
  max-width: 100%;
}

.availability__cta {
  border: 2px solid var(--ladesa-green-1-color);
  color: var(--ladesa-green-1-color);
  padding-inline: 2.25rem;
}

.availability__cta:hover {
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 10%);
}

.availability__cta-icon {
  width: 1rem;
  height: 1rem;
}

.availability__reason-icon--eye {
  width: 1.25rem;
}

.availability__reason-icon--edit {
  width: 0.875rem;
}

@media (max-width: 639.98px) {
  .availability__reasons-row {
    flex-direction: column;
  }
}

.indisponibilidade-button {
  border: 2px solid var(--ladesa-grey-color);
  color: var(--ladesa-text-default-color);
  transition: background-color var(--ui-duration-base) var(--ui-easing-standard);
}

.indisponibilidade-button:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 15%);
}

.indisponibilidade-button:active {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 25%);
}
</style>
