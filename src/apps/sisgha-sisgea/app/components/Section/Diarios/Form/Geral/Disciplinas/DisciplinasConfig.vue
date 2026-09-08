<script setup lang="ts">
import type { IDisciplinaConfig } from '../Contexto';
import {
  useContextDiariosFormGeral,
  diariosFormValidateKey,
} from '../Contexto';
import { useDisciplinasConfigEdit } from './useDisciplinasConfigEdit';
import { useDisciplinasConfigSubmit } from './useDisciplinasConfigSubmit';

const props = defineProps<{
  editId?: string | null;
}>();

const emit = defineEmits<{
  close: [];
  back: [];
}>();

const contexto = useContextDiariosFormGeral();
const formValidate = inject(diariosFormValidateKey);

const isEditMode = computed(() => !!props.editId);

// Buscar disciplinas do curso da turma selecionada
const cursoId = computed(() => {
  const turma = contexto.turmaSelecionada.value;
  return (
    ((turma?.curso as Record<string, unknown>)?.id as string | null) ?? null
  );
});

const { disciplinas, isLoading: isLoadingDisciplinas } =
  useDisciplinasByCurso(cursoId);

// Buscar diários já existentes para turma+calendário (evitar duplicatas)
const diarios = useDiarios();
const existingDiariosQuery = diarios.list(
  computed(() => {
    if (!contexto.turmaId.value || !contexto.calendarioLetivoId.value)
      return {};
    return {
      'filter.turma.id': [contexto.turmaId.value],
      'filter.calendarioLetivo.id': [contexto.calendarioLetivoId.value],
      limit: 100,
    };
  })
);

const existingDisciplinaIds = computed(() => {
  const data = existingDiariosQuery.data.value?.data;
  if (!data) return new Set<string>();
  return new Set(
    (data as Record<string, unknown>[]).map(
      d => ((d.disciplina as Record<string, unknown>)?.id as string) ?? ''
    )
  );
});

const disciplinasDisponiveis = computed(() =>
  disciplinas.value.filter(
    d => !existingDisciplinaIds.value.has(d.disciplinaId)
  )
);

// Inicializar config das disciplinas quando carregarem (modo criação)
watch(
  disciplinasDisponiveis,
  newDisciplinas => {
    if (isEditMode.value) return;
    if (newDisciplinas.length === 0) return;
    if (contexto.disciplinasConfig.value.length > 0) return;

    contexto.disciplinasConfig.value = newDisciplinas.map(
      (d): IDisciplinaConfig => ({
        disciplinaId: d.disciplinaId,
        disciplina: d,
        accordionOpen: false,
        activeTab: 'dias',
        modoAgrupamento: 'DEFINIDO',
        preferenciasAgrupamento: [
          {
            modo: 'DEFINIDO',
            ordem: 1,
            diaSemanaIso: null,
            aulasSeguidas: 1,
            dataInicio: '',
            dataFim: null,
          },
        ],
        professoresSelecionados: [],
      })
    );
  },
  { immediate: true }
);

// Edição: carregar dados existentes
useDisciplinasConfigEdit(props.editId, contexto);

// Submissão e ações
const { onSubmit, onDelete, canSubmit, isBusy, imagemFile, confirmDelete } =
  useDisciplinasConfigSubmit(
    computed(() => props.editId),
    contexto,
    { close: () => emit('close') },
    formValidate
  );

const title = computed(() =>
  isEditMode.value
    ? 'Editar diário: Configurar disciplinas'
    : 'Cadastrar diários: Configurar disciplinas'
);

const turmaInfo = computed(() => {
  const turma = contexto.turmaSelecionada.value;
  if (!turma) return null;
  const curso = turma.curso as Record<string, unknown> | undefined;
  return {
    nome: turma.periodo as string,
    cursoNome: (curso?.nome as string) ?? '',
  };
});
</script>

<template>
  <DialogModalBaseLayout :on-close="() => emit('close')" :title="title">
    <div class="u-flex u-flex-col u-gap-4">
      <!-- Card turma (read-only) -->
      <div v-if="turmaInfo" class="u-rounded-lg disciplinas-config__turma-card">
        <p class="u-font-semibold u-text-sm disciplinas-config__turma-nome">
          {{ turmaInfo.nome }}
        </p>
        <p class="u-text-xs disciplinas-config__turma-curso">
          {{ turmaInfo.cursoNome }}
        </p>
      </div>

      <!-- Imagem de capa (modo edição) -->
      <UISelectImage v-if="isEditMode" v-model="imagemFile" />

      <!-- Banner informativo -->
      <div
        v-if="!isEditMode && turmaInfo"
        class="u-flex u-items-center u-gap-3 disciplinas-config__info-banner"
      >
        <span class="u-text-xs disciplinas-config__info-banner-text">
          Para cada disciplina abaixo será criado um diário vinculado à turma
          {{ turmaInfo.nome }}.
        </span>
      </div>

      <!-- Loading -->
      <div
        v-if="isLoadingDisciplinas || contexto.isLoadingEdit.value"
        class="u-flex u-items-center u-justify-center disciplinas-config__loading"
      >
        <span class="u-text-sm disciplinas-config__loading-text">
          {{
            contexto.isLoadingEdit.value
              ? 'Carregando diário...'
              : 'Carregando disciplinas...'
          }}
        </span>
      </div>

      <!-- Todas as disciplinas já possuem diário -->
      <div
        v-else-if="
          !isEditMode &&
          disciplinasDisponiveis.length === 0 &&
          disciplinas.length > 0
        "
        class="u-flex u-items-center u-gap-3 disciplinas-config__warning-banner"
      >
        <span class="u-text-xs disciplinas-config__warning-banner-text">
          Todas as disciplinas desta turma já possuem diário cadastrado para o
          calendário letivo selecionado.
        </span>
      </div>

      <!-- Lista de accordions -->
      <div v-else class="u-overflow-auto u-flex u-flex-col u-gap-4">
        <SectionDiariosFormGeralDisciplinasAccordionDisciplinaAccordion
          v-for="(dc, index) in contexto.disciplinasConfig.value"
          :key="dc.disciplinaId"
          :index="index"
        />
      </div>
    </div>

    <template #button-group>
      <UIButtonModalGoBack v-if="!isEditMode" @click="emit('back')" />
      <UIButtonModalCancel @click="emit('close')" />
      <UIButtonModalDelete v-if="isEditMode" @click="onDelete" />
      <form @submit.prevent="onSubmit">
        <UIButtonModalEdit v-if="isEditMode" :disabled="!canSubmit || isBusy" />
        <UIButtonModalSave v-else :disabled="!canSubmit || isBusy" />
      </form>
    </template>

    <DialogConfirm
      v-model="confirmDelete.isOpen.value"
      message="Deseja realmente excluir este diário?"
      @confirm="confirmDelete.onConfirm"
      @cancel="confirmDelete.onCancel"
    />
  </DialogModalBaseLayout>
</template>

<style scoped>
.disciplinas-config__turma-card {
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 100%);
  padding: var(--ui-space-3) var(--ui-space-5);
}

.disciplinas-config__turma-nome {
  color: var(--ladesa-text-default-color);
}

.disciplinas-config__turma-curso {
  color: rgb(from var(--ladesa-grey-color) R G B / 100%);
}

.disciplinas-config__info-banner {
  background-color: rgb(from var(--ladesa-blue-color) R G B / 10%);
  border: 1px solid rgb(from var(--ladesa-blue-color) R G B / 10%);
  border-radius: var(--ui-radius-sm);
  padding: var(--ui-space-2) var(--ui-space-3);
}

.disciplinas-config__info-banner-text {
  color: rgb(from var(--ladesa-blue-color) R G B / 100%);
}

.disciplinas-config__loading {
  padding-block: var(--ui-space-8);
}

.disciplinas-config__loading-text {
  color: rgb(from var(--ladesa-grey-color) R G B / 100%);
  animation: disciplinas-config-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes disciplinas-config-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.disciplinas-config__warning-banner {
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: var(--ui-radius-sm);
  padding: var(--ui-space-4) var(--ui-space-3);
}

.disciplinas-config__warning-banner-text {
  color: #b45309;
}
</style>
