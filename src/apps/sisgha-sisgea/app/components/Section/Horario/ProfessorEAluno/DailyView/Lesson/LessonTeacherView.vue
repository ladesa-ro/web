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
  <div class="u-flex u-flex-col u-gap-2">
    <h1 class="u-font-semibold">
      {{ lesson.discipline }} - {{ lesson.class }}
    </h1>

    <div v-if="lesson.id" class="u-flex u-flex-wrap u-gap-3 u-text-xs">
      <button
        type="button"
        class="cancel-button u-font-medium"
        @click="openCancelar"
      >
        Cancelar minha ocorrência
      </button>

      <button
        type="button"
        class="request-button u-font-medium"
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

<style scoped>
.cancel-button {
  color: var(--ladesa-red-color);
}

.cancel-button:hover {
  text-decoration: underline;
}

.request-button {
  color: var(--ladesa-text-green-color);
}

.request-button:hover {
  text-decoration: underline;
}
</style>
