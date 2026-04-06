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

// Composables reativos
const ofertasFormacoes = useOfertasFormacoes();
const cursosComposable = useCursos();
const turmasComposable = useTurmas();

// Local state
const todosParticipam = ref(props.modelValue.todosParticipam);
const selectedFormacoes = ref<Array<{ id: string; nome: string }>>([]);
const selectedTurmas = ref<Map<string, Set<string>>>(new Map());
const selectedPerfis = ref<Set<string>>(new Set());
const expandedFormacoes = ref<Set<string>>(new Set());

// Queries reativas
const formacoesList = ofertasFormacoes.list();
const formacoes = computed(() =>
  (formacoesList.data.value?.data ?? []).map((f) => ({ id: f.id, nome: f.nome }))
);

// IDs de formações selecionadas para carregar cursos
const selectedFormacaoIds = computed(() => selectedFormacoes.value.map(f => f.id));

// Cursos filtrados por formações selecionadas
const cursosByFormacao = ref<Map<string, Array<{ id: string; nome: string }>>>(new Map());
const turmasByCurso = ref<Map<string, Array<{ id: string; nome: string }>>>(new Map());

async function loadCursos(formacaoId: string) {
  if (cursosByFormacao.value.has(formacaoId)) return;
  try {
    const result = cursosComposable.list(
      computed(() => ({
        'filter.ofertaFormacao.id': [formacaoId],
        limit: 100,
      }))
    );
    // Aguardar dados carregarem
    const stop = watch(
      () => result.data.value,
      (data) => {
        if (data) {
          cursosByFormacao.value.set(
            formacaoId,
            (data.data ?? []).map((c) => ({ id: c.id, nome: c.nome }))
          );
          stop();
        }
      },
      { immediate: true },
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
      (data) => {
        if (data) {
          turmasByCurso.value.set(
            cursoId,
            (data.data ?? []).map((t) => ({ id: t.id, nome: t.nome ?? t.id.substring(0, 8) }))
          );
          stop();
        }
      },
      { immediate: true },
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
  <div class="flex flex-col gap-4">
    <div class="flex h-[13px] items-center border-l-3 border-ldsa-green-1 pl-1">
      <span class="text-[13px] font-semibold tracking-wide text-ldsa-text-default">
        Turmas e professores participantes
      </span>
    </div>

    <!-- Global checkbox -->
    <UIFormCheckbox v-model="todosParticipam" label="Todas as turmas e professores participam" :disabled="disabled" />

    <!-- Formações -->
    <template v-if="!todosParticipam">
      <div class="flex flex-col gap-2">
        <span class="text-xs font-semibold text-ldsa-grey">Formações</span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="formacao in formacoes"
            :key="formacao.id"
            type="button"
            :disabled="disabled"
            class="px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors"
            :class="isFormacaoSelected(formacao.id)
              ? 'bg-ldsa-green-1 text-white border-ldsa-green-1'
              : 'border-ldsa-grey/30 text-ldsa-text-default hover:bg-ldsa-grey/10'"
            @click="toggleFormacao(formacao)"
          >
            {{ formacao.nome }}
          </button>
        </div>
      </div>

      <!-- Accordion per formação -->
      <div
        v-for="formacao in selectedFormacoes"
        :key="formacao.id"
        class="border border-ldsa-grey/30 rounded-lg p-3 flex flex-col gap-3"
      >
        <button
          type="button"
          class="flex items-center justify-between w-full"
          @click="expandedFormacoes.has(formacao.id) ? expandedFormacoes.delete(formacao.id) : expandedFormacoes.add(formacao.id)"
        >
          <span class="text-sm font-semibold text-ldsa-text-default">{{ formacao.nome }}</span>
          <span class="text-ldsa-green-1 text-xs">{{ expandedFormacoes.has(formacao.id) ? '▲' : '▼' }}</span>
        </button>

        <template v-if="expandedFormacoes.has(formacao.id)">
          <!-- Cursos and Turmas -->
          <div
            v-for="curso in (cursosByFormacao.get(formacao.id) ?? [])"
            :key="curso.id"
            class="pl-3 flex flex-col gap-2"
          >
            <span class="text-xs font-medium text-ldsa-grey">{{ curso.nome }}</span>

            <div class="flex flex-wrap gap-2 pl-2">
              <UIFormCheckbox
                v-for="turma in (turmasByCurso.get(curso.id) ?? [])"
                :key="turma.id"
                :model-value="isTurmaSelected(curso.id, turma.id)"
                :disabled="disabled"
                :label="turma.nome"
                @update:model-value="toggleTurma(curso.id, turma.id)"
              />
            </div>

            <button
              v-if="!turmasByCurso.has(curso.id)"
              type="button"
              class="text-xs text-ldsa-green-1 underline pl-2"
              @click="loadTurmas(curso.id)"
            >
              Carregar turmas
            </button>
          </div>

          <p
            v-if="(cursosByFormacao.get(formacao.id) ?? []).length === 0"
            class="text-xs text-ldsa-grey pl-3"
          >
            Nenhum curso encontrado para esta formação.
          </p>
        </template>
      </div>
    </template>
  </div>
</template>
