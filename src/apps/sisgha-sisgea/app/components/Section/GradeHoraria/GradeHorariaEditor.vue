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
    const msg = e instanceof Error ? e.message : 'Erro ao salvar grades horárias.';
    toast.error({ title: msg });
  }
}

function cancelar() {
  validationErrors.value = new Map();
  cancelEdit();
}

function updateIntervalInicio(gradeIndex: number, intervalIndex: number, value: string) {
  const grade = grades.value[gradeIndex];
  const intervalo = grade?.intervalos[intervalIndex];
  if (intervalo) {
    intervalo.inicio = value;
  }
}

function updateIntervalFim(gradeIndex: number, intervalIndex: number, value: string) {
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
</script>

<template>
  <UIContainer variant="larger" class="flex flex-col gap-6">
    <UIBreadcrumbDapeBreadcrumb>
      <div class="flex gap-4 items-center">
        <template v-if="!isEditing">
          <button
            :disabled="isLoading || !campusContext"
            class="px-4 py-2 bg-ldsa-green-1 text-white rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            @click="enterEditMode"
          >
            Editar
          </button>
        </template>
        <template v-else>
          <button
            :disabled="isSaving"
            class="px-4 py-2 bg-ldsa-green-1 text-white rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            @click="salvar"
          >
            {{ isSaving ? 'Salvando...' : 'Salvar' }}
          </button>
          <button
            :disabled="isSaving"
            class="px-4 py-2 border border-ldsa-grey text-ldsa-grey rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
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

    <div v-if="isLoading" class="text-center py-12 text-ldsa-grey">
      Carregando grades horárias...
    </div>

    <div
      v-else-if="!campusContext"
      class="text-center py-12 text-ldsa-grey"
    >
      Selecione um campus para visualizar as grades horárias.
    </div>

    <template v-else>
      <div class="flex flex-col gap-4">
        <SectionGradeHorariaAccordionItem
          v-for="(grade, index) in grades"
          :key="grade.identificadorExterno"
          :grade="grade"
          :grade-index="index"
          :is-editing="isEditing"
          :disabled="isSaving"
          :errors="validationErrors.get(index)"
          @update:nome="updateGradeNome(index, $event)"
          @update:intervalo-inicio="(idx: number, val: string) => updateIntervalInicio(index, idx, val)"
          @update:intervalo-fim="(idx: number, val: string) => updateIntervalFim(index, idx, val)"
          @add-interval="(periodo: string) => addInterval(index, periodo)"
          @remove-interval="(idx: number) => removeInterval(index, idx)"
          @remove-intervals-by-periodo="(periodo: string) => removeIntervalsByPeriodo(index, periodo)"
          @clear-all-intervals="clearAllIntervals(index)"
          @remove-grade="removeGrade(index)"
        />
      </div>

      <div
        v-if="grades.length === 0 && !isEditing"
        class="text-center py-12 text-ldsa-grey"
      >
        Nenhuma grade horária cadastrada.
      </div>

      <button
        v-if="isEditing"
        :disabled="isSaving"
        class="px-4 py-2 border-2 border-dashed border-ldsa-green-2 text-ldsa-text-green rounded-lg text-sm font-medium hover:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed"
        @click="addGrade"
      >
        + Adicionar grade horária
      </button>
    </template>
  </UIContainer>
</template>
