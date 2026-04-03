<script setup lang="ts">
import { useContextDiariosFormGeral } from '../Contexto';

const emit = defineEmits<{
  next: [];
  close: [];
}>();

const contexto = useContextDiariosFormGeral();

const searchBarText = ref('');

// Composables
const ofertaFormacoes = useOfertasFormacoes();
const cursos = useCursos();
const turmas = useTurmas();
const calendariosLetivos = useCalendarioLetivo();

// Queries
const ofertaFormacaoListQuery = ofertaFormacoes.list();

const cursoListQuery = cursos.list(
  computed(() => {
    if (!contexto.ofertaFormacaoId.value) return {};
    return {
      'filter.ofertaFormacao.id': [contexto.ofertaFormacaoId.value],
    };
  })
);

const turmaListQuery = turmas.list(
  computed(() => {
    const params: Record<string, unknown> = {};
    if (contexto.cursoId.value) {
      params['filter.curso.id'] = [contexto.cursoId.value];
    }
    if (searchBarText.value) {
      params.search = searchBarText.value;
    }
    return params;
  })
);

const calendarioListQuery = calendariosLetivos.list();

// Opções para selects
const ofertaFormacaoItems = computed(
  () =>
    ofertaFormacaoListQuery.data.value?.data?.map(
      (o: Record<string, unknown>) => ({
        value: o.id as string,
        label: o.nome as string,
      })
    ) ?? []
);

const cursoItems = computed(
  () =>
    cursoListQuery.data.value?.data?.map(
      (c: Record<string, unknown>) => ({
        value: c.id as string,
        label: c.nome as string,
      })
    ) ?? []
);

const calendarioItems = computed(
  () =>
    calendarioListQuery.data.value?.data?.map(
      (c: Record<string, unknown>) => ({
        value: c.id as string,
        label: c.nome as string,
      })
    ) ?? []
);

const turmaRadioItems = computed(
  () =>
    turmaListQuery.data.value?.data?.map(
      (t: Record<string, unknown>) => ({
        value: t.id as string,
        label: (t.periodo as string) ?? '',
        turma: t,
      })
    ) ?? []
);

// Watchers cascata
watch(
  () => contexto.ofertaFormacaoId.value,
  () => {
    contexto.cursoId.value = null;
    contexto.turmaId.value = null;
    contexto.turmaSelecionada.value = null;
  }
);

watch(
  () => contexto.cursoId.value,
  () => {
    contexto.turmaId.value = null;
    contexto.turmaSelecionada.value = null;
  }
);

function onTurmaSelect(turmaId: string) {
  contexto.turmaId.value = turmaId;
  const turma = turmaListQuery.data.value?.data?.find(
    (t: Record<string, unknown>) => t.id === turmaId
  );
  contexto.turmaSelecionada.value =
    (turma as Record<string, unknown>) ?? null;
}

const canAdvance = computed(
  () => !!contexto.turmaId.value && !!contexto.calendarioLetivoId.value
);

function nextForm() {
  if (canAdvance.value) {
    emit('next');
  }
}
</script>

<template>
  <DialogModalBaseLayout
    :on-close="() => emit('close')"
    title="Cadastrar diários: Selecionar turma"
  >
    <div class="flex flex-col gap-4">
      <!-- Calendário Letivo -->
      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-ldsa-grey/100">
          Calendário Letivo
        </label>
        <select
          :value="contexto.calendarioLetivoId.value ?? ''"
          class="border-2 border-ldsa-grey/100 rounded-lg px-4 py-3 text-sm"
          @change="
            contexto.calendarioLetivoId.value =
              ($event.target as HTMLSelectElement).value || null
          "
        >
          <option value="">Selecione...</option>
          <option
            v-for="item in calendarioItems"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </div>

      <!-- Formação -->
      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-ldsa-grey/100">
          Formação
        </label>
        <select
          :value="contexto.ofertaFormacaoId.value ?? ''"
          class="border-2 border-ldsa-grey/100 rounded-lg px-4 py-3 text-sm"
          @change="
            contexto.ofertaFormacaoId.value =
              ($event.target as HTMLSelectElement).value || null
          "
        >
          <option value="">Selecione...</option>
          <option
            v-for="item in ofertaFormacaoItems"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </div>

      <!-- Curso -->
      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-ldsa-grey/100">
          Curso
        </label>
        <select
          :value="contexto.cursoId.value ?? ''"
          :disabled="!contexto.ofertaFormacaoId.value"
          class="border-2 border-ldsa-grey/100 rounded-lg px-4 py-3 text-sm disabled:opacity-50"
          @change="
            contexto.cursoId.value =
              ($event.target as HTMLSelectElement).value || null
          "
        >
          <option value="">Selecione...</option>
          <option
            v-for="item in cursoItems"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </div>

      <!-- Pesquisa -->
      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-ldsa-grey/100">
          Pesquisar
        </label>
        <input
          v-model="searchBarText"
          type="text"
          placeholder="Digite aqui."
          class="border-2 border-ldsa-grey/100 rounded-lg px-4 py-3 text-sm"
        />
      </div>

      <!-- Lista de turmas -->
      <div class="max-h-[300px] overflow-y-auto flex flex-col gap-2">
        <div
          v-for="item in turmaRadioItems"
          :key="item.value"
          class="flex items-center justify-between border-2 rounded-lg px-4 py-3 cursor-pointer transition-colors"
          :class="
            contexto.turmaId.value === item.value
              ? 'border-ldsa-green-1 bg-ldsa-green-1/10'
              : 'border-ldsa-grey/100'
          "
          @click="onTurmaSelect(item.value)"
        >
          <div class="flex flex-col">
            <span class="font-semibold text-sm text-ldsa-text-default">
              {{ item.label }}
            </span>
            <span class="text-xs text-ldsa-grey/100">
              {{
                (
                  (item.turma as Record<string, unknown>)
                    ?.curso as Record<string, unknown>
                )?.nome ?? ''
              }}
            </span>
          </div>
          <div
            class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
            :class="
              contexto.turmaId.value === item.value
                ? 'border-ldsa-green-1'
                : 'border-ldsa-grey/100'
            "
          >
            <div
              v-if="contexto.turmaId.value === item.value"
              class="w-3 h-3 rounded-full bg-ldsa-green-1"
            />
          </div>
        </div>

        <div
          v-if="turmaRadioItems.length === 0 && contexto.cursoId.value"
          class="text-center text-sm text-ldsa-grey/100 py-4"
        >
          Nenhuma turma encontrada.
        </div>
      </div>
    </div>

    <template #button-group>
      <UIButtonModalCancel @click="emit('close')" />
      <UIButtonModalAdvance :disabled="!canAdvance" @click="nextForm" />
    </template>
  </DialogModalBaseLayout>
</template>
