<script setup lang="ts">
import type { IDisciplinaConfig, IPreferenciaAgrupamento } from '../Contexto';
import { useContextDiariosFormGeral } from '../Contexto';

const props = defineProps<{
  editId?: string | null;
}>();

const emit = defineEmits<{
  close: [];
  back: [];
}>();

const contexto = useContextDiariosFormGeral();
const diarios = useDiarios();
const { showToast } = useToast();

const isEditMode = computed(() => !!props.editId);
const isBusy = ref(false);

// Buscar disciplinas do curso da turma selecionada
const cursoId = computed(() => {
  const turma = contexto.turmaSelecionada.value;
  return (turma?.curso as Record<string, unknown>)?.id as string | null ?? null;
});

const { disciplinas, isLoading: isLoadingDisciplinas } =
  useDisciplinasByCurso(cursoId);

// Buscar diários já existentes para turma+calendário (evitar duplicatas)
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

// Disciplinas disponíveis (excluindo as que já têm diário)
const disciplinasDisponiveis = computed(() =>
  disciplinas.value.filter(
    (d) => !existingDisciplinaIds.value.has(d.disciplinaId)
  )
);

// Inicializar config das disciplinas quando carregarem
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
const editDiarioQuery = isEditMode.value && props.editId
  ? diarios.findOne(computed(() => props.editId ?? null))
  : null;

const editProfsQuery = isEditMode.value && props.editId
  ? diarios.listProfessores(props.editId)
  : null;

const editPrefsQuery = isEditMode.value && props.editId
  ? diarios.listPreferenciasAgrupamento(props.editId)
  : null;

if (editDiarioQuery) {
  watch(
    [
      () => editDiarioQuery.data.value,
      () => editProfsQuery?.data.value,
      () => editPrefsQuery?.data.value,
    ],
    ([diario, profsData, prefsData]) => {
      if (!diario) return;
      if (contexto.disciplinasConfig.value.length > 0) return;

      contexto.turmaSelecionada.value = diario.turma as Record<string, unknown>;
      contexto.turmaId.value = diario.turma.id;
      contexto.calendarioLetivoId.value = diario.calendarioLetivo.id;

      const curso = diario.turma?.curso as Record<string, unknown> | undefined;
      contexto.cursoId.value = (curso?.id as string) ?? null;

      const professorIds = (profsData?.data ?? []).map(
        (p: Record<string, unknown>) =>
          ((p.perfil as Record<string, unknown>)?.id as string) ?? ''
      ).filter(Boolean);

      // Mapear preferências existentes ou usar default
      const existingPrefs = (prefsData?.data ?? []) as Record<string, unknown>[];
      const preferenciasAgrupamento: IPreferenciaAgrupamento[] =
        existingPrefs.length > 0
          ? existingPrefs.map((p) => ({
              modo: (p.modo as string as IPreferenciaAgrupamento['modo']) ?? 'DEFINIDO',
              ordem: (p.ordem as number) ?? 1,
              diaSemanaIso: (p.diaSemanaIso as number | null) ?? null,
              aulasSeguidas: (p.aulasSeguidas as number) ?? 1,
              dataInicio: (p.dataInicio as string) ?? '',
              dataFim: (p.dataFim as string | null) ?? null,
            }))
          : [
              {
                modo: 'DEFINIDO',
                ordem: 1,
                diaSemanaIso: null,
                aulasSeguidas: 1,
                dataInicio: '',
                dataFim: null,
              },
            ];

      const modoAgrupamento = preferenciasAgrupamento[0]?.modo ?? 'DEFINIDO';

      contexto.disciplinasConfig.value = [
        {
          disciplinaId: diario.disciplina.id,
          disciplina: {
            id: '',
            disciplinaId: diario.disciplina.id,
            disciplinaNome: diario.disciplina.nome,
            cargaHoraria: null,
            numeroPeriodo: 0,
          },
          accordionOpen: true,
          activeTab: 'dias',
          modoAgrupamento,
          preferenciasAgrupamento,
          professoresSelecionados: professorIds,
        },
      ];

      contexto.isLoadingEdit.value = false;
    },
    { immediate: true }
  );
}

// Título do modal
const title = computed(() =>
  isEditMode.value
    ? 'Editar diário: Configurar disciplinas'
    : 'Cadastrar diários: Configurar disciplinas'
);

// Turma info para exibição
const turmaInfo = computed(() => {
  const turma = contexto.turmaSelecionada.value;
  if (!turma) return null;
  const curso = turma.curso as Record<string, unknown> | undefined;
  return {
    nome: turma.periodo as string,
    cursoNome: (curso?.nome as string) ?? '',
  };
});

// Submissão
async function onSubmit() {
  if (isBusy.value) return;
  isBusy.value = true;

  try {
    if (isEditMode.value && props.editId) {
      await submitEdit(props.editId);
    } else {
      await submitCreate();
    }

    await diarios.invalidate();
    emit('close');
  } catch (err) {
    showToast(
      isEditMode.value ? 'atualizacao' : 'cadastro',
      'error'
    );
  } finally {
    isBusy.value = false;
  }
}

function getDataInicioFallback(): string {
  return new Date().toISOString().split('T')[0] ?? '';
}

function mapPreferencias(prefs: IPreferenciaAgrupamento[]) {
  return prefs.map((p) => ({
    modo: p.modo,
    ordem: p.ordem,
    diaSemanaIso: p.diaSemanaIso,
    aulasSeguidas: p.aulasSeguidas,
    dataInicio: p.dataInicio || getDataInicioFallback(),
    dataFim: p.dataFim,
  }));
}

async function submitCreate() {
  // Filtrar disciplinas que possuem pelo menos um dia de aula
  const diariosComDias = contexto.disciplinasConfig.value.filter(
    (dc) => dc.preferenciasAgrupamento.length > 0
  );

  if (diariosComDias.length === 0) {
    showToast('cadastro', 'error', 'Nenhuma disciplina possui dias de aula configurados.');
    return;
  }

  const payload = {
    turma: { id: contexto.turmaId.value! },
    calendarioLetivo: { id: contexto.calendarioLetivoId.value! },
    diarios: diariosComDias.map((dc) => ({
      disciplina: { id: dc.disciplinaId },
      ativo: true,
      professores: dc.professoresSelecionados.map((perfilId) => ({
        perfilId,
        situacao: true,
      })),
      preferenciasAgrupamento: mapPreferencias(dc.preferenciasAgrupamento),
    })),
  };

  await diarios.batchCreate(payload);
  showToast('cadastro', 'success');
}

async function submitEdit(editId: string) {
  const dc = contexto.disciplinasConfig.value[0];
  if (!dc) return;

  await diarios.bulkReplaceProfessores(editId, {
    professores: dc.professoresSelecionados.map((perfilId) => ({
      perfilId,
      situacao: true,
    })),
  });

  await diarios.bulkReplacePreferenciasAgrupamento(editId, {
    preferenciasAgrupamento: mapPreferencias(dc.preferenciasAgrupamento),
  });

  showToast('atualizacao', 'success');
}

const canSubmit = computed(() => {
  if (!contexto.turmaId.value) return false;
  if (!contexto.calendarioLetivoId.value) return false;
  if (contexto.disciplinasConfig.value.length === 0) return false;
  return true;
});

// Deletar diário (modo edição)
const confirmDelete = useConfirmDelete();

async function onDelete() {
  if (!props.editId) return;
  const confirmed = await confirmDelete.confirm();
  if (!confirmed) return;

  try {
    await diarios.remove(props.editId);
    await diarios.invalidate();
    showToast('delete', 'success');
    emit('close');
  } catch {
    showToast('delete', 'error');
  }
}
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
