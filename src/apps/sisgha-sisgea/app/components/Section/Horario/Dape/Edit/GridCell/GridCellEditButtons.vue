<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { usuarioFindAll, turmaFindAll } from '@ladesa-ro/web.api.client';
import type { Aula, EditableCellType, Vago } from '~/utils/schedule/types';

const api = useApiClient();

const cell = defineModel<Aula | Vago>({
  required: true,
  default: {},
});

const emit = defineEmits(['atividade-change']);

const changeCellType = (atv: EditableCellType) => {
  if (cell.value.type !== atv) {
    cell.value.type = atv;

    emit('atividade-change');
  }
};

const popoverOpen = defineModel<boolean>('popover', {
  default: false,
  required: false,
});

const toggleItems = [
  { text: 'Aula', value: 'aula' },
  { text: 'Vago', value: 'vago' },
];

const cellType = computed(() => cell.value.type);

const changeActivityValue = ref(cellType.value ?? 'vago');

const scheduleOf: 'professor' | 'turma' | undefined = inject('scheduleOf');

const professoresQuery = useQuery({
  queryKey: ['usuarios', 'professor-list'],
  queryFn: () => api.call(usuarioFindAll, { query: {} }),
  enabled: scheduleOf === 'turma',
});

const turmasQuery = useQuery({
  queryKey: ['turmas', 'turma-list'],
  queryFn: () => api.call(turmaFindAll, { query: {} }),
  enabled: scheduleOf === 'professor',
});

onMounted(() => {
  if (cell.value.type === 'aula') {
    const profSelected = cell.value.diario.professor;
    const disciplinaSelected = cell.value.diario.disciplina;
    const turmaSelected = cell.value.diario.turma;
  }
});

const turmasOrProfessoresSelected = ref();

const professorItems = computed(() =>
  (professoresQuery.data.value?.data ?? []).map(professor => ({
    label: professor.nome ?? 'Nome não disponível',
    value: professor.id,
  }))
);

const turmaItems = computed(() =>
  (turmasQuery.data.value?.data ?? []).map(turma => ({
    label: `${turma.periodo} ${turma.curso.nomeAbreviado}`,
    value: turma.id,
  }))
);

const picker = computed(() => {
  if (scheduleOf !== 'turma' && scheduleOf !== 'professor') return null;

  const isTurmaSchedule = scheduleOf === 'turma';
  const query = isTurmaSchedule ? professoresQuery : turmasQuery;

  return {
    label: isTurmaSchedule ? 'Professor' : 'Turma',
    placeholder: isTurmaSchedule
      ? 'Selecione um professor'
      : 'Selecione uma turma',
    errorMessage: isTurmaSchedule
      ? 'Ocorreu um erro ao buscar os professores.'
      : 'Ocorreu um erro ao buscar as turmas.',
    hasData: !!query.data.value,
    isLoading: query.isLoading.value,
    isError: query.isError.value,
    items: isTurmaSchedule ? professorItems.value : turmaItems.value,
  };
});
</script>

<template>
  <div class="grid-cell-edit-buttons u-flex">
    <SectionHorarioDapeEditPopoverEdit
      v-model="popoverOpen"
      :handle-confirm-button-click="changeCellType"
      :change-activity-value="changeActivityValue"
    >
      <template #activator>
        <button
          class="grid-cell-edit-buttons__edit-btn u-flex u-items-center u-justify-center u-rounded-sm"
        >
          <IconsEdit />
        </button>
      </template>

      <UIToggle v-model="changeActivityValue" :items="toggleItems" />

      <template v-if="changeActivityValue === 'aula'">
        <template v-if="picker">
          <UIFormOptionFieldsAutocomplete
            v-if="picker.hasData"
            v-model:selected-option="turmasOrProfessoresSelected"
            :placeholder="picker.placeholder"
            :label="picker.label"
            :items="picker.items"
          />

          <span v-else-if="picker.isLoading"> Carregando... </span>

          <span v-else-if="picker.isError">{{ picker.errorMessage }}</span>
        </template>

        <VVAutocompleteAPIDisciplina
          :disabled="!turmasOrProfessoresSelected"
          name="disciplina.id"
        />
      </template>
    </SectionHorarioDapeEditPopoverEdit>

    <button
      class="grid-cell-edit-buttons__exclude-btn u-flex u-items-center u-justify-center u-rounded-sm u-p-1"
      :class="[
        cell.type === 'vago'
          ? 'grid-cell-edit-buttons__exclude-btn--disabled'
          : 'grid-cell-edit-buttons__exclude-btn--enabled',
      ]"
      @click.stop="changeCellType('vago')"
    >
      <IconsExclude />
    </button>
  </div>
</template>

<style scoped>
.grid-cell-edit-buttons__edit-btn,
.grid-cell-edit-buttons__exclude-btn {
  width: 1.375rem;
  height: 1.375rem;
}

.grid-cell-edit-buttons__edit-btn {
  padding: 0.313rem;
  color: var(--ladesa-text-default-color);
}

.grid-cell-edit-buttons__edit-btn:hover {
  background-color: rgb(from var(--ladesa-text-default-color) R G B / 15%);
}

.grid-cell-edit-buttons__exclude-btn {
  color: var(--ladesa-red-color);
}

.grid-cell-edit-buttons__exclude-btn:hover {
  background-color: rgb(from var(--ladesa-red-color) R G B / 15%);
}

.grid-cell-edit-buttons__exclude-btn--disabled {
  opacity: 0;
  cursor: default;
}

.grid-cell-edit-buttons__exclude-btn--enabled {
  cursor: pointer;
}

@media (max-width: 1023.98px) {
  .grid-cell-edit-buttons {
    margin-top: 0.688rem;
  }
}
</style>
