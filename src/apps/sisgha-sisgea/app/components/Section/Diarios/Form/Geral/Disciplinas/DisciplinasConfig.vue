<script setup lang="ts">
import type { FormValidationResult } from 'vee-validate';
import type { IDisciplinaConfig } from '../Contexto';
import { useContextDiariosFormGeral } from '../Contexto';
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
const formValidate = inject<() => Promise<FormValidationResult<Record<string, unknown>>>>('diarios-form-validate');

const isEditMode = computed(() => !!props.editId);

// Buscar disciplinas do curso da turma selecionada
const cursoId = computed(() => {
  const turma = contexto.turmaSelecionada.value;
  return (turma?.curso as Record<string, unknown>)?.id as string | null ?? null;
});

const { disciplinas, isLoading: isLoadingDisciplinas } =
  useDisciplinasByCurso(cursoId);

// Buscar diários já existentes para turma+calendário (evitar duplicatas)
const diarios = useDiarios();
const existingDiariosQuery = diarios.list(
  computed(() => {
    if (!contexto.turmaId.value || !contexto.calendarioLetivoId.value) return {};
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
      (d) => ((d.disciplina as Record<string, unknown>)?.id as string) ?? ''
    )
  );
});

const disciplinasDisponiveis = computed(() =>
  disciplinas.value.filter(
    (d) => !existingDisciplinaIds.value.has(d.disciplinaId)
  )
);

// Inicializar config das disciplinas quando carregarem (modo criação)
watch(
  disciplinasDisponiveis,
  (newDisciplinas) => {
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
    formValidate,
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
    <div class="flex flex-col gap-4">
      <!-- Card turma (read-only) -->
      <div
        v-if="turmaInfo"
        class="border-2 border-ldsa-grey/100 rounded-lg px-5 py-3"
      >
        <p class="font-semibold text-sm text-ldsa-text-default">
          {{ turmaInfo.nome }}
        </p>
        <p class="text-xs text-ldsa-grey/100">
          {{ turmaInfo.cursoNome }}
        </p>
      </div>

      <!-- Imagem de capa (modo edição) -->
      <UISelectImage v-if="isEditMode" v-model="imagemFile" />

      <!-- Banner informativo -->
      <div
        v-if="!isEditMode && turmaInfo"
        class="flex items-center gap-3 bg-ldsa-blue/10 border border-ldsa-blue/10 rounded px-3 py-2"
      >
        <span class="text-ldsa-blue/100 text-xs">
          Para cada disciplina abaixo será criado um diário vinculado à turma
          {{ turmaInfo.nome }}.
        </span>
      </div>

      <!-- Loading -->
      <div
        v-if="isLoadingDisciplinas || contexto.isLoadingEdit.value"
        class="flex items-center justify-center py-8"
      >
        <span class="text-sm text-ldsa-grey/100 animate-pulse">
          {{ contexto.isLoadingEdit.value ? 'Carregando diário...' : 'Carregando disciplinas...' }}
        </span>
      </div>

      <!-- Todas as disciplinas já possuem diário -->
      <div
        v-else-if="!isEditMode && disciplinasDisponiveis.length === 0 && disciplinas.length > 0"
        class="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded px-3 py-4"
      >
        <span class="text-amber-700 text-xs">
          Todas as disciplinas desta turma já possuem diário cadastrado para o calendário letivo selecionado.
        </span>
      </div>

      <!-- Lista de accordions -->
      <div
        v-else
        class="overflow-y-auto flex flex-col gap-4"
      >
        <SectionDiariosFormGeralDisciplinasAccordionDisciplinaAccordion
          v-for="(dc, index) in contexto.disciplinasConfig.value"
          :key="dc.disciplinaId"
          :index="index"
        />
      </div>
    </div>

    <template #button-group>
      <UIButtonModalGoBack
        v-if="!isEditMode"
        @click="emit('back')"
      />
      <UIButtonModalCancel @click="emit('close')" />
      <UIButtonModalDelete
        v-if="isEditMode"
        @click="onDelete"
      />
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
