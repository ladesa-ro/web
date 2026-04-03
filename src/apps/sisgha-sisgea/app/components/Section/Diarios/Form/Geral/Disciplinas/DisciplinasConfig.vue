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

// Inicializar config das disciplinas quando carregarem
watch(
  disciplinas,
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
if (isEditMode.value && props.editId) {
  const diarioQuery = diarios.findOne(computed(() => props.editId ?? null));

  watch(
    () => diarioQuery.data.value,
    async (diario) => {
      if (!diario) return;

      contexto.turmaSelecionada.value = diario.turma as Record<string, unknown>;
      contexto.turmaId.value = diario.turma.id;
      contexto.calendarioLetivoId.value = diario.calendarioLetivo.id;

      const curso = diario.turma?.curso as Record<string, unknown> | undefined;
      contexto.cursoId.value = (curso?.id as string) ?? null;

      // Carregar professores do diário
      const profsQuery = diarios.listProfessores(diario.id);
      const profs = profsQuery.data;

      // Carregar preferências
      // TODO: carregar preferencias do diário via API quando disponível

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
          professoresSelecionados:
            profs.value?.data?.map(
              (p: Record<string, unknown>) =>
                ((p.perfil as Record<string, unknown>)?.id as string) ?? ''
            ) ?? [],
        },
      ];
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
  const payload = {
    turma: { id: contexto.turmaId.value! },
    calendarioLetivo: { id: contexto.calendarioLetivoId.value! },
    diarios: contexto.disciplinasConfig.value.map((dc) => ({
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
        v-if="isLoadingDisciplinas"
        class="flex items-center justify-center py-8"
      >
        <span class="text-sm text-ldsa-grey/100">
          Carregando disciplinas...
        </span>
      </div>

      <!-- Lista de accordions -->
      <div
        v-else
        class="max-h-[400px] overflow-y-auto flex flex-col gap-4"
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
      <form @submit.prevent="onSubmit">
        <UIButtonModalEdit v-if="isEditMode" :disabled="!canSubmit || isBusy" />
        <UIButtonModalSave v-else :disabled="!canSubmit || isBusy" />
      </form>
    </template>
  </DialogModalBaseLayout>
</template>
