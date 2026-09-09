<script lang="ts" setup>
import { computed } from 'vue';
import FormAutocomplete from './FormAutocomplete.vue';
import type { ParsedOptionItem } from './option-item';

export interface GradeOption {
  identificadorExterno: string;
  nome: string;
}

export type GradeSelectorProps = {
  grades: GradeOption[];
  selectedIdentifier: string | null;
  isEditing: boolean;
  disabled?: boolean;
};

const props = defineProps<GradeSelectorProps>();

const emit = defineEmits<{
  'update:selectedIdentifier': [value: string | null];
}>();

const items = computed<ParsedOptionItem[]>(() =>
  props.grades.map(grade => ({
    label: grade.nome,
    value: grade.identificadorExterno,
  }))
);

const selectedOption = computed<string | null>({
  get: () => props.selectedIdentifier,
  set: value => emit('update:selectedIdentifier', value ?? null),
});

const selectedGradeName = computed(() => {
  if (!props.selectedIdentifier) return 'Nenhuma grade selecionada';
  const grade = props.grades.find(
    g => g.identificadorExterno === props.selectedIdentifier
  );
  return grade?.nome ?? 'Grade desconhecida';
});
</script>

<template>
  <div v-if="isEditing && !disabled" class="u-flex u-flex-col u-gap-1">
    <FormAutocomplete
      v-model:selected-option="selectedOption"
      label="Grade horária"
      placeholder="Selecione uma grade horária"
      :items="items"
      :disabled="disabled"
    />
  </div>
</template>
