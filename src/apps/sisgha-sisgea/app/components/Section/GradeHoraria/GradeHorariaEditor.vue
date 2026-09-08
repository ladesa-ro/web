<script setup lang="ts">
const campusContext = useCampusContext();
const toast = useToast();

const {
  grades,
  isEditing,
  isSaving,
  isLoading,
  enterEditMode,
  cancelEdit,
  addGrade,
  removeGrade,
  addInterval,
  removeInterval,
  removeIntervalsByPeriodo,
  clearAllIntervals,
  addIntervalsBulk,
  validate,
  validationErrors,
  save,
} = useGradeHorariaEditor(campusContext);

const hasErrors = computed(() => validationErrors.value.size > 0);

async function salvar() {
  const errors = validate();
  if (errors.length > 0) {
    return;
  }

  try {
    await save();
    toast.success({ title: 'Grades horárias atualizadas com sucesso!' });
  } catch (e: unknown) {
    const msg =
      e instanceof Error ? e.message : 'Erro ao salvar grades horárias.';
    toast.error({ title: msg });
  }
}

function cancelar() {
  validationErrors.value = new Map();
  cancelEdit();
}

function updateIntervalInicio(
  gradeIndex: number,
  intervalIndex: number,
  value: string
) {
  const grade = grades.value[gradeIndex];
  const intervalo = grade?.intervalos[intervalIndex];
  if (intervalo) {
    intervalo.inicio = value;
  }
}

function updateIntervalFim(
  gradeIndex: number,
  intervalIndex: number,
  value: string
) {
  const grade = grades.value[gradeIndex];
  const intervalo = grade?.intervalos[intervalIndex];
  if (intervalo) {
    intervalo.fim = value;
  }
}

function updateGradeNome(gradeIndex: number, value: string) {
  const grade = grades.value[gradeIndex];
  if (grade) {
    grade.nome = value;
  }
}

const canEdit = computed(() => {
  return !isLoading.value && campusContext.value;
});
</script>

<template>
  <UIContainer variant="larger" class="u-flex u-flex-col u-gap-6">
    <UIBreadcrumbDapeBreadcrumb>
      <div class="u-flex u-gap-4 u-items-center">
        <template v-if="!isEditing">
          <button
            :disabled="!canEdit"
            class="u-px-4 u-py-2 u-rounded-md u-text-sm u-font-medium grade-editor__btn-primary"
            @click="enterEditMode"
          >
            Editar
          </button>
        </template>
        <template v-else>
          <button
            :disabled="isSaving"
            class="u-px-4 u-py-2 u-rounded-md u-text-sm u-font-medium grade-editor__btn-primary"
            @click="salvar"
          >
            {{ isSaving ? 'Salvando...' : 'Salvar' }}
          </button>
          <button
            :disabled="isSaving"
            class="u-px-4 u-py-2 u-rounded-md u-text-sm u-font-medium grade-editor__btn-secondary"
            @click="cancelar"
          >
            Cancelar
          </button>
        </template>
      </div>
    </UIBreadcrumbDapeBreadcrumb>

    <UIAlert
      v-if="hasErrors"
      type="warning"
      message="Verifique as inconsistências destacadas abaixo."
    />

    <div
      v-if="isLoading"
      class="u-text-center u-py-12 grade-editor__placeholder"
    >
      Carregando grades horárias...
    </div>

    <div
      v-else-if="!campusContext"
      class="u-text-center u-py-12 grade-editor__placeholder"
    >
      Selecione um campus para visualizar as grades horárias.
    </div>

    <template v-else>
      <div class="u-flex u-flex-col u-gap-4">
        <SectionGradeHorariaAccordionItem
          v-for="(grade, index) in grades"
          :key="grade.identificadorExterno"
          :grade="grade"
          :grade-index="index"
          :is-editing="isEditing"
          :disabled="isSaving"
          :errors="validationErrors.get(index)"
          @update:nome="updateGradeNome(index, $event)"
          @update:intervalo-inicio="
            (idx: number, val: string) => updateIntervalInicio(index, idx, val)
          "
          @update:intervalo-fim="
            (idx: number, val: string) => updateIntervalFim(index, idx, val)
          "
          @add-interval="(periodo: string) => addInterval(index, periodo)"
          @remove-interval="(idx: number) => removeInterval(index, idx)"
          @remove-intervals-by-periodo="
            (periodo: string) => removeIntervalsByPeriodo(index, periodo)
          "
          @clear-all-intervals="clearAllIntervals(index)"
          @add-intervals-bulk="params => addIntervalsBulk(index, params)"
          @remove-grade="removeGrade(index)"
        />
      </div>

      <div
        v-if="grades.length === 0 && !isEditing"
        class="u-text-center u-py-12 grade-editor__placeholder"
      >
        Nenhuma grade horária cadastrada.
      </div>

      <button
        v-if="isEditing"
        :disabled="isSaving"
        class="u-px-4 u-py-2 u-rounded-lg u-text-sm u-font-medium grade-editor__btn-add"
        @click="addGrade"
      >
        + Adicionar grade horária
      </button>
    </template>
  </UIContainer>
</template>

<style scoped>
.grade-editor__btn-primary {
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
}

.grade-editor__btn-primary:hover {
  opacity: 0.9;
}

.grade-editor__btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.grade-editor__btn-secondary {
  border: 1px solid var(--ladesa-grey-color);
  color: var(--ladesa-grey-color);
}

.grade-editor__btn-secondary:hover {
  opacity: 0.9;
}

.grade-editor__btn-secondary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.grade-editor__placeholder {
  color: var(--ladesa-grey-color);
}

.grade-editor__btn-add {
  border: 2px dashed var(--ladesa-green-2-color);
  color: var(--ladesa-text-green-color);
}

.grade-editor__btn-add:hover {
  opacity: 0.7;
}

.grade-editor__btn-add:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
