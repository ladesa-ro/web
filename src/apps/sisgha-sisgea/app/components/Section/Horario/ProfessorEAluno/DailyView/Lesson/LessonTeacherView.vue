<script lang="ts" setup>
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';

const lesson = inject<ILesson>('lesson')!;

const agendamento = useCalendarioAgendamento();
const { showToast } = useToast();

const scopeModalOpen = ref(false);
const solicitarMudancaOpen = ref(false);

function openCancelar() {
  if (!lesson.id) return;
  scopeModalOpen.value = true;
}

async function handleCancelarConfirm(payload: {
  scope: string;
  motivo?: string;
}) {
  if (!lesson.id || lesson.version === undefined) return;

  try {
    await agendamento.cancelarOcorrencia(
      lesson.id,
      {
        dataOcorrencia: lesson.occurrenceDate ?? lesson.startsAt,
        motivo: payload.motivo,
      },
      lesson.version
    );
    await agendamento.invalidate();
    showToast('atualizacao', 'success', 'Ocorrência cancelada com sucesso.');
  } catch (err) {
    console.error(err);
    showToast(
      'atualizacao',
      'error',
      'Não foi possível cancelar a ocorrência.'
    );
  }
}

function openSolicitarMudanca() {
  if (!lesson.id) return;
  solicitarMudancaOpen.value = true;
}
</script>
<template>
  <div class="flex flex-col gap-2">
    <h1 class="font-semibold">{{ lesson.discipline }} - {{ lesson.class }}</h1>

    <div v-if="lesson.id" class="flex flex-wrap gap-3 text-xs">
      <button
        type="button"
        class="text-ldsa-red font-medium hover:underline"
        @click="openCancelar"
      >
        Cancelar minha ocorrência
      </button>

      <button
        type="button"
        class="text-ldsa-text-green font-medium hover:underline"
        @click="openSolicitarMudanca"
      >
        Solicitar mudança
      </button>
    </div>

    <SectionCalendarioEventRecurrenceScopeModal
      v-model="scopeModalOpen"
      mode="delete"
      restrict-to-current-occurrence
      @confirm="handleCancelarConfirm"
    />

    <SectionCalendarioSolicitacoesMudancaAberturaModal
      v-if="lesson.id"
      v-model="solicitarMudancaOpen"
      :evento-id="lesson.id"
    />
  </div>
</template>
