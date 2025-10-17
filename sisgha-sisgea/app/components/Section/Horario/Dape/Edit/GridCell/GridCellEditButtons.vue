<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import type {
  Aula,
  EditableCellType,
  Vago,
} from '~/composables/schedule/useScheduleTypes';

const cell = defineModel<Aula | Vago>({
  required: true,
  default: {},
});

const emit = defineEmits(['atividade-change']);

const changeCellType = (atv: EditableCellType) => {
  if (cell.value.type !== atv) {
    cell.value.type = atv;

    if (cell.value.type === 'aula') {
      // TODO: fazer modificações no diário da aula
    }

    emit('atividade-change');
  }
};

//

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

//

const scheduleOf: 'professor' | 'turma' | undefined = inject('scheduleOf');

// TODO: melhorar essa estrutura de querries para fazer apenas 1 query à api em algum componente ancestral a este, ao inves de uma query em todas as instâncias
const professoresQuery = useQuery({
  ...listPerfis({ filterCargo: ['professor'] }),
  enabled: scheduleOf === 'turma',
});

const turmasQuery = useQuery({
  ...listTurmas(),
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
</script>

<template>
  <div class="flex">
    <SectionHorarioDapeEditPopoverEdit
      v-model="popoverOpen"
      :handle-confirm-button-click="changeCellType"
      :change-activity-value="changeActivityValue"
    >
      <template #activator>
        <IconsEdit
          class="px-[0.15625rem] text-ldsa-text-default hover:bg-ldsa-text-default/10 mr-1 rounded"
        />
      </template>

      <UIToggle v-model="changeActivityValue" :items="toggleItems" />

      <template v-if="changeActivityValue === 'aula'">
        <template v-if="scheduleOf === 'turma'">
          <UIFormOptionFieldsAutocomplete
            placeholder="Selecione um professor"
            label="Professor"
            v-if="professoresQuery.data.value"
            :items="
              professoresQuery.data.value.data.map(professor => ({
                label: professor.usuario.nome ?? 'Nome não disponível',
                value: professor.id,
              }))
            "
            v-model:selected-option="turmasOrProfessoresSelected"
          />

          <span v-else-if="professoresQuery.isLoading"> Carregando... </span>

          <span v-else-if="professoresQuery.isError">
            Ocorreu um erro ao buscar os professores.
          </span>
        </template>

        <template v-else-if="scheduleOf === 'professor'">
          <UIFormOptionFieldsAutocomplete
            placeholder="Selecione uma turma"
            label="Turma"
            v-if="turmasQuery.data.value"
            :items="
              turmasQuery.data.value.data.map(turma => ({
                label: `${turma.periodo} ${turma.curso.nomeAbreviado}`,
                value: turma.id,
              }))
            "
            v-model:selected-option="turmasOrProfessoresSelected"
          />

          <span v-else-if="professoresQuery.isLoading"> Carregando... </span>

          <span v-else-if="professoresQuery.isError">
            Ocorreu um erro ao buscar os professores.
          </span>
        </template>

        <VVAutocompleteAPIDisciplina
          :disabled="!turmasOrProfessoresSelected"
          name="disciplina.id"
        />
      </template>
    </SectionHorarioDapeEditPopoverEdit>

    <IconsExclude
      @click.stop="changeCellType('vago')"
      :class="[
        'inline w-4.5 p-0.5 text-ldsa-red hover:bg-ldsa-red/10 rounded',
        cell.type === 'vago' ? 'opacity-0 cursor-default' : 'cursor-pointer',
      ]"
    />
  </div>
</template>
