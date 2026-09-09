<script lang="ts" setup>
const props = defineProps<{
  modelValue: {
    todosParticipam: boolean;
    turmas: Array<{ id: string }>;
    perfis: Array<{ id: string }>;
    ofertasFormacao: Array<{ id: string }>;
  };
  disabled?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue];
}>();

const ofertasFormacoes = useOfertasFormacoes();
const cursosComposable = useCursos();
const turmasComposable = useTurmas();

const todosParticipam = ref(props.modelValue.todosParticipam);
const selectedFormacoes = ref<Array<{ id: string; nome: string }>>([]);
const selectedTurmas = ref<Map<string, Set<string>>>(new Map());
const selectedPerfis = ref<Set<string>>(new Set());
const expandedFormacoes = ref<Set<string>>(new Set());

const formacoesList = ofertasFormacoes.list();
const formacoes = computed(() =>
  (formacoesList.data.value?.data ?? []).map(f => ({ id: f.id, nome: f.nome }))
);

const selectedFormacaoIds = computed(() =>
  selectedFormacoes.value.map(f => f.id)
);

const cursosByFormacao = ref<Map<string, Array<{ id: string; nome: string }>>>(
  new Map()
);
const turmasByCurso = ref<Map<string, Array<{ id: string; nome: string }>>>(
  new Map()
);

async function loadCursos(formacaoId: string) {
  if (cursosByFormacao.value.has(formacaoId)) return;
  try {
    const result = cursosComposable.list(
      computed(() => ({
        'filter.ofertaFormacao.id': [formacaoId],
        limit: 100,
      }))
    );

    const stop = watch(
      () => result.data.value,
      data => {
        if (data) {
          cursosByFormacao.value.set(
            formacaoId,
            (data.data ?? []).map(c => ({ id: c.id, nome: c.nome }))
          );
          stop();
        }
      },
      { immediate: true }
    );
  } catch (e) {
    console.error('Erro ao carregar cursos:', e);
  }
}

async function loadTurmas(cursoId: string) {
  if (turmasByCurso.value.has(cursoId)) return;
  try {
    const result = turmasComposable.list(
      computed(() => ({
        'filter.curso.id': [cursoId],
        limit: 100,
      }))
    );
    const stop = watch(
      () => result.data.value,
      data => {
        if (data) {
          turmasByCurso.value.set(
            cursoId,
            (data.data ?? []).map(t => ({
              id: t.id,
              nome: t.nome ?? t.id.substring(0, 8),
            }))
          );
          stop();
        }
      },
      { immediate: true }
    );
  } catch (e) {
    console.error('Erro ao carregar turmas:', e);
  }
}

async function toggleFormacao(formacao: { id: string; nome: string }) {
  const idx = selectedFormacoes.value.findIndex(f => f.id === formacao.id);
  if (idx >= 0) {
    selectedFormacoes.value.splice(idx, 1);
    expandedFormacoes.value.delete(formacao.id);

    const coursesInFormacao = cursosByFormacao.value.get(formacao.id) ?? [];
    for (const curso of coursesInFormacao) {
      selectedTurmas.value.delete(curso.id);
    }
  } else {
    selectedFormacoes.value.push(formacao);
    expandedFormacoes.value.add(formacao.id);
    await loadCursos(formacao.id);

    const courses = cursosByFormacao.value.get(formacao.id) ?? [];
    await Promise.all(courses.map(c => loadTurmas(c.id)));
  }
  emitUpdate();
}

function toggleTurma(cursoId: string, turmaId: string) {
  if (!selectedTurmas.value.has(cursoId)) {
    selectedTurmas.value.set(cursoId, new Set());
  }
  const set = selectedTurmas.value.get(cursoId);
  if (!set) return;
  if (set.has(turmaId)) set.delete(turmaId);
  else set.add(turmaId);
  emitUpdate();
}

function isFormacaoSelected(id: string) {
  return selectedFormacoes.value.some(f => f.id === id);
}

function isTurmaSelected(cursoId: string, turmaId: string) {
  return selectedTurmas.value.get(cursoId)?.has(turmaId) ?? false;
}

function emitUpdate() {
  const allTurmaIds: Array<{ id: string }> = [];
  for (const [, set] of selectedTurmas.value) {
    for (const id of set) allTurmaIds.push({ id });
  }

  emit('update:modelValue', {
    todosParticipam: todosParticipam.value,
    turmas: allTurmaIds,
    perfis: [...selectedPerfis.value].map(id => ({ id })),
    ofertasFormacao: selectedFormacoes.value.map(f => ({ id: f.id })),
  });
}

watch(todosParticipam, () => emitUpdate());
</script>

<template>
  <div class="u-flex u-flex-col u-gap-4">
    <div class="u-flex u-items-center u-pl-1 participantes-selector__header">
      <span class="u-font-semibold participantes-selector__title">
        Turmas e professores participantes
      </span>
    </div>

    <UIFormCheckbox
      v-model="todosParticipam"
      label="Todas as turmas e professores participam"
      :disabled="disabled"
    />

    <template v-if="!todosParticipam">
      <div class="u-flex u-flex-col u-gap-2">
        <span
          class="u-text-xs u-font-semibold participantes-selector__section-label"
          >Formações</span
        >
        <div class="u-flex u-flex-wrap u-gap-2">
          <button
            v-for="formacao in formacoes"
            :key="formacao.id"
            type="button"
            :disabled="disabled"
            class="u-px-3 u-py-1-5 u-rounded-lg u-text-xs u-font-medium participantes-selector__formacao-chip"
            :class="
              isFormacaoSelected(formacao.id)
                ? 'participantes-selector__formacao-chip--selected'
                : 'participantes-selector__formacao-chip--unselected'
            "
            @click="toggleFormacao(formacao)"
          >
            {{ formacao.nome }}
          </button>
        </div>
      </div>

      <div
        v-for="formacao in selectedFormacoes"
        :key="formacao.id"
        class="u-rounded-lg u-p-3 u-flex u-flex-col u-gap-3 participantes-selector__accordion"
      >
        <button
          type="button"
          class="u-flex u-items-center u-justify-between u-w-full"
          @click="
            expandedFormacoes.has(formacao.id)
              ? expandedFormacoes.delete(formacao.id)
              : expandedFormacoes.add(formacao.id)
          "
        >
          <span
            class="u-text-sm u-font-semibold participantes-selector__formacao-nome"
            >{{ formacao.nome }}</span
          >
          <span class="u-text-xs participantes-selector__chevron">{{
            expandedFormacoes.has(formacao.id) ? '▲' : '▼'
          }}</span>
        </button>

        <template v-if="expandedFormacoes.has(formacao.id)">
          <SectionCalendarioFormSharedCursoTurmas
            v-for="curso in cursosByFormacao.get(formacao.id) ?? []"
            :key="curso.id"
            :nome="curso.nome"
            :turmas="turmasByCurso.get(curso.id)"
            :disabled="disabled"
            :is-turma-selected="
              (turmaId: string) => isTurmaSelected(curso.id, turmaId)
            "
            @toggle="(turmaId: string) => toggleTurma(curso.id, turmaId)"
            @load="loadTurmas(curso.id)"
          />

          <p
            v-if="(cursosByFormacao.get(formacao.id) ?? []).length === 0"
            class="u-text-xs participantes-selector__empty-cursos"
          >
            Nenhum curso encontrado para esta formação.
          </p>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped>
.participantes-selector__header {
  height: 13px;
  border-left: 3px solid var(--ladesa-green-1-color);
}

.participantes-selector__title {
  font-size: 13px;
  letter-spacing: 0.025em;
  color: var(--ladesa-text-default-color);
}

.participantes-selector__section-label {
  color: var(--ladesa-grey-color);
}

.participantes-selector__formacao-chip {
  border: 1px solid transparent;
  transition:
    background-color var(--ui-duration-fast) var(--ui-easing-standard),
    color var(--ui-duration-fast) var(--ui-easing-standard),
    border-color var(--ui-duration-fast) var(--ui-easing-standard);
}

.participantes-selector__formacao-chip--selected {
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
  border-color: var(--ladesa-green-1-color);
}

.participantes-selector__formacao-chip--unselected {
  border-color: rgb(from var(--ladesa-grey-color) R G B / 30%);
  color: var(--ladesa-text-default-color);
}

.participantes-selector__formacao-chip--unselected:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.participantes-selector__accordion {
  border: 1px solid rgb(from var(--ladesa-grey-color) R G B / 30%);
}

.participantes-selector__formacao-nome {
  color: var(--ladesa-text-default-color);
}

.participantes-selector__chevron {
  color: var(--ladesa-green-1-color);
}

.participantes-selector__empty-cursos {
  color: var(--ladesa-grey-color);
  padding-left: var(--ui-space-3);
}
</style>
