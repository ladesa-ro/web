<script lang="ts" setup>
import { capitalizeFirst } from '../../../../Horario/-Helpers/CapitalizeFirst';
import { IconsAdd, IconsEdit, IconsEyeOn } from '#components';
import DialogSkeleton from '@/components/Dialog/DialogSkeleton.vue';
import ModalCadastrarMotivo from '../../MotivosForm/ModalCadastrarMotivo.vue';
import type { Vinculo } from '../../FormUtils';

const { vinculo } = defineProps<{ vinculo: Vinculo }>();
const emit = defineEmits(['atualizarMotivos']);

const {
  composables: { useFindOneQuery },
} = useLadesaApiCrudCampi();

const { data: campus, suspense } = useFindOneQuery(vinculo.campus.id);
await suspense();

const dayShifts = [
  { title: 'matutino', times: ['07:30', '08:20', '09:10', '10:00', '10:20', '11:10'] },
  { title: 'vespertino', times: ['13:00', '13:50', '14:40', '15:30', '15:50', '16:40'] },
  { title: 'noturno', times: ['19:00', '19:50', '20:40', '21:30', '21:50', '22:40'] },
];

const selectedTimes = ref<string[]>([]);
const motivosIndisponibilidade = ref<{ horario: string; motivo: string }[]>([]);

const modalAbertoCadastrar = ref(false);
const modalAberto = ref<'consultar' | 'editar' | null>(null);

const allTimes = dayShifts.flatMap(s => s.times);

const horariosIndisponiveis = computed(() =>
  allTimes.filter(time => !selectedTimes.value.includes(time))
);

const horariosSemMotivo = computed(() =>
  horariosIndisponiveis.value.filter(
    time => !motivosIndisponibilidade.value.some(m => m.horario === time)
  )
);

const mostrarBotaoCadastrarMotivo = computed(() => horariosSemMotivo.value.length > 0);

function abrirModalCadastrarMotivo() {
  modalAbertoCadastrar.value = true;
}

function abrirModalConsultarMotivo() {
  modalAberto.value = 'consultar';
}

function abrirModalEditarMotivo() {
  modalAberto.value = 'editar';
}

function fecharModal() {
  modalAberto.value = null;
  modalAbertoCadastrar.value = false;
}

function adicionarMotivo(horario: string, motivo: string) {
  const index = motivosIndisponibilidade.value.findIndex(m => m.horario === horario);
  if (index !== -1) {
    const motivoExistente = motivosIndisponibilidade.value[index];
    if (motivoExistente) {
      motivoExistente.motivo = motivo;
    }
  } else {
    motivosIndisponibilidade.value.push({ horario, motivo });
  }
  fecharModal();
}

watch(
  motivosIndisponibilidade,
  novosMotivos => emit('atualizarMotivos', novosMotivos),
  { deep: true }
);
</script>

<template>
  <v-expansion-panel :value="vinculo.campus.id" class="h-full">
    <v-expansion-panel-title class="font-medium" expand-icon="mdi-menu-down">
      {{ campus?.apelido }}
    </v-expansion-panel-title>

    <v-expansion-panel-text>
      <section class="flex gap-6 justify-between">
        <div v-for="shift in dayShifts" :key="shift.title">
          <h1>{{ capitalizeFirst(shift.title) }}</h1>

          <UICheckbox :items="shift.times" v-model="selectedTimes" />

          <div v-for="time in shift.times" :key="time">
            <p
              v-if="motivosIndisponibilidade.find(m => m.horario === time) && !selectedTimes.includes(time)"
              class="text-sm text-red-600 italic ml-6"
            >
              Motivo: {{ motivosIndisponibilidade.find(m => m.horario === time)?.motivo }}
            </p>
          </div>
        </div>
      </section>

      <div class="mb-9">
        <p
          v-if="mostrarBotaoCadastrarMotivo"
          class="mt-6 mb-2 text-ldsa-grey font-medium text-[12px] text-center"
        >
          Há horários não selecionados cuja indisponibilidade ainda não foi justificada
        </p>

        <button
          v-if="mostrarBotaoCadastrarMotivo"
          class="flex justify-between items-center gap-2 border-2 border-ldsa-green-1 text-ldsa-green-1 px-9 py-3 rounded-lg w-full text-sm font-semibold hover:bg-ldsa-green-1/10"
          @click="abrirModalCadastrarMotivo"
        >
          Cadastrar motivos de indisponibilidade
          <IconsAdd class="w-4 h-4" />
        </button>
      </div>

      <DialogSkeleton v-model="modalAbertoCadastrar">
        <ModalCadastrarMotivo
          :horariosSemMotivo="horariosSemMotivo"
          @fechar="fecharModal"
          @cadastrar="adicionarMotivo"
        />
      </DialogSkeleton>

      <div>
        <p class="main-title font-semibold pb-5 text-[12px]">
          Motivos de indisponibilidade
        </p>

        <div class="flex gap-5 justify-between">
          <button
            class="flex justify-between items-center gap-2 border-2 border-ldsa-grey text-ldsa-black px-12 py-3 rounded-lg w-full text-[12px] font-semibold hover:bg-gray-100"
            @click="abrirModalConsultarMotivo"
          >
            Consultar
            <IconsEyeOn class="w-4 h-4" />
          </button>

          <button
            class="flex justify-between items-center gap-2 border-2 border-ldsa-grey text-ldsa-black px-12 py-3 rounded-lg w-full text-[12px] font-semibold hover:bg-gray-100"
            @click="abrirModalEditarMotivo"
          >
            Editar
            <IconsEdit class="w-3 h-3" />
          </button>
        </div>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<style scoped>
.main-title::before {
  content: '';
  border: 2px solid var(--ladesa-green-1-color);
  margin-right: 0.5rem;
}
</style>
