<script setup lang="ts">
import type { ParsedItem } from '~/composables/useOptionItems';
import { useContextDiariosFormGeral } from '../Contexto';

const emit = defineEmits<{
  next: [];
  close: [];
}>();

const contexto = useContextDiariosFormGeral();

const searchBarText = ref('');

// Composables
const campi = useCampi();
const ofertaFormacoes = useOfertasFormacoes();
const cursos = useCursos();
const turmas = useTurmas();
const calendariosLetivos = useCalendarioLetivo();

// Queries
const campiListQuery = campi.list();

const ofertaFormacaoListQuery = ofertaFormacoes.list(
  computed(() => {
    if (!contexto.campusId.value) return {};
    return { 'filter.campus.id': [contexto.campusId.value] };
  })
);

const cursoListQuery = cursos.list(
  computed(() => {
    const params: Record<string, unknown> = {};
    if (contexto.campusId.value) {
      params['filter.campus.id'] = [contexto.campusId.value];
    }
    if (contexto.ofertaFormacaoId.value) {
      params['filter.ofertaFormacao.id'] = [contexto.ofertaFormacaoId.value];
    }
    return params;
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

const calendarioListQuery = calendariosLetivos.list(
  computed(() => {
    if (!contexto.campusId.value) return {};
    return { 'filter.campus.id': [contexto.campusId.value] };
  })
);

// Opções para selects (ParsedItem[])
const campusItems = computed(
  () =>
    campiListQuery.data.value?.data?.map((c: Record<string, unknown>) => ({
      value: c.id as string,
      label: (c.apelido as string) ?? '',
    })) ?? []
);

const calendarioItems = computed(
  () =>
    calendarioListQuery.data.value?.data?.map((c: Record<string, unknown>) => ({
      value: c.id as string,
      label: (c.nome as string) ?? '',
    })) ?? []
);

const ofertaFormacaoItems = computed(
  () =>
    ofertaFormacaoListQuery.data.value?.data?.map(
      (o: Record<string, unknown>) => ({
        value: o.id as string,
        label: (o.nome as string) ?? '',
      })
    ) ?? []
);

const cursoItems = computed(
  () =>
    cursoListQuery.data.value?.data?.map((c: Record<string, unknown>) => ({
      value: c.id as string,
      label: (c.nome as string) ?? '',
    })) ?? []
);

const turmaRadioItems = computed(
  () =>
    turmaListQuery.data.value?.data?.map((t: Record<string, unknown>) => ({
      value: t.id as string,
      label: (t.periodo as string) ?? '',
      turma: t,
      curso:
        ((t.curso as Record<string, unknown> | undefined)?.nome as string) ??
        '',
    })) ?? []
);

// Modelos para selects (ParsedItem)
const campusSelected = computed({
  get: () =>
    campusItems.value.find(i => i.value === contexto.campusId.value) ??
    undefined,
  set: (val: ParsedItem | undefined) => {
    contexto.campusId.value = val?.value ?? null;
  },
});

const calendarioSelected = computed({
  get: () =>
    calendarioItems.value.find(
      i => i.value === contexto.calendarioLetivoId.value
    ) ?? undefined,
  set: (val: ParsedItem | undefined) => {
    contexto.calendarioLetivoId.value = val?.value ?? null;
  },
});

const ofertaFormacaoSelected = computed({
  get: () =>
    ofertaFormacaoItems.value.find(
      i => i.value === contexto.ofertaFormacaoId.value
    ) ?? undefined,
  set: (val: ParsedItem | undefined) => {
    contexto.ofertaFormacaoId.value = val?.value ?? null;
  },
});

const cursoSelected = computed({
  get: () =>
    cursoItems.value.find(i => i.value === contexto.cursoId.value) ?? undefined,
  set: (val: ParsedItem | undefined) => {
    contexto.cursoId.value = val?.value ?? null;
  },
});

// Watchers cascata
useCascadingFilters([
  {
    ref: contexto.campusId,
    resetOnChange: [
      contexto.calendarioLetivoId,
      contexto.ofertaFormacaoId,
      contexto.cursoId,
      contexto.turmaId,
      contexto.turmaSelecionada,
    ],
  },
  {
    ref: contexto.calendarioLetivoId,
    resetOnChange: [
      contexto.ofertaFormacaoId,
      contexto.cursoId,
      contexto.turmaId,
      contexto.turmaSelecionada,
    ],
  },
  {
    ref: contexto.ofertaFormacaoId,
    resetOnChange: [
      contexto.cursoId,
      contexto.turmaId,
      contexto.turmaSelecionada,
    ],
  },
  {
    ref: contexto.cursoId,
    resetOnChange: [contexto.turmaId, contexto.turmaSelecionada],
  },
]);

function onTurmaSelect(turmaId: string) {
  contexto.turmaId.value = turmaId;
  const turma = turmaListQuery.data.value?.data?.find(
    (t: Record<string, unknown>) => t.id === turmaId
  );
  contexto.turmaSelecionada.value = (turma as Record<string, unknown>) ?? null;
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
    <div class="u-flex u-flex-col u-gap-4">
      <!-- Campus -->
      <UIFormOptionFieldsSelect
        v-model="campusSelected"
        label="Campus"
        placeholder="Selecione um campus"
        :items="campusItems"
      />

      <!-- Calendário Letivo -->
      <UIFormOptionFieldsSelect
        v-model="calendarioSelected"
        label="Calendário Letivo"
        placeholder="Selecione..."
        :items="calendarioItems"
        :disabled="!contexto.campusId.value"
      />

      <!-- Formação -->
      <UIFormOptionFieldsSelect
        v-model="ofertaFormacaoSelected"
        label="Formação"
        placeholder="Selecione..."
        :items="ofertaFormacaoItems"
        :disabled="
          !contexto.campusId.value || !contexto.calendarioLetivoId.value
        "
      />

      <!-- Curso -->
      <UIFormOptionFieldsSelect
        v-model="cursoSelected"
        label="Curso"
        placeholder="Selecione..."
        :items="cursoItems"
        :disabled="!contexto.ofertaFormacaoId.value"
      />

      <!-- Pesquisa e turmas (só aparecem com curso selecionado) -->
      <template v-if="contexto.cursoId.value">
        <UIFormTextField
          :model-value="searchBarText"
          label="Pesquisar"
          placeholder="Digite aqui."
          name="search"
          @update:model-value="searchBarText = String($event ?? '')"
        />

        <!-- Lista de turmas -->
        <div
          class="u-flex u-flex-col u-gap-2 u-overflow-auto turma-select__list"
        >
          <div
            v-for="item in turmaRadioItems"
            :key="item.value"
            class="u-flex u-items-center u-justify-between u-rounded-lg turma-select__item"
            :class="{
              'turma-select__item--selected':
                contexto.turmaId.value === item.value,
            }"
            @click="onTurmaSelect(item.value)"
          >
            <div class="u-flex u-flex-col">
              <span class="u-font-semibold u-text-sm turma-select__item-label">
                {{ item.label }}
              </span>
              <span class="u-text-xs turma-select__item-curso">
                {{ item.curso }}
              </span>
            </div>
            <div
              class="u-flex u-items-center u-justify-center u-shrink-0 u-rounded-full turma-select__radio"
              :class="{
                'turma-select__radio--selected':
                  contexto.turmaId.value === item.value,
              }"
            >
              <div
                v-if="contexto.turmaId.value === item.value"
                class="u-rounded-full turma-select__radio-dot"
              />
            </div>
          </div>

          <div
            v-if="turmaRadioItems.length === 0 && contexto.cursoId.value"
            class="u-text-center u-text-sm turma-select__empty"
          >
            Nenhuma turma encontrada.
          </div>
        </div>
      </template>
    </div>

    <template #button-group>
      <UIButtonModalCancel @click="emit('close')" />
      <UIButtonModalAdvance :disabled="!canAdvance" @click="nextForm" />
    </template>
  </DialogModalBaseLayout>
</template>

<style scoped>
.turma-select__list {
  max-height: 18.75rem;
}

.turma-select__item {
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 100%);
  padding: var(--ui-space-3) var(--ui-space-4);
  cursor: pointer;
  transition:
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    border-color var(--ui-duration-base) var(--ui-easing-standard);
}

.turma-select__item--selected {
  border-color: var(--ladesa-green-1-color);
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 10%);
}

.turma-select__item-label {
  color: var(--ladesa-text-default-color);
}

.turma-select__item-curso {
  color: rgb(from var(--ladesa-grey-color) R G B / 100%);
}

.turma-select__radio {
  width: var(--ui-space-5);
  height: var(--ui-space-5);
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 100%);
}

.turma-select__radio--selected {
  border-color: var(--ladesa-green-1-color);
}

.turma-select__radio-dot {
  width: var(--ui-space-3);
  height: var(--ui-space-3);
  background-color: var(--ladesa-green-1-color);
}

.turma-select__empty {
  color: rgb(from var(--ladesa-grey-color) R G B / 100%);
  padding-block: var(--ui-space-4);
}
</style>
