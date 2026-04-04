<script setup lang="ts">
import type { ParsedItem } from '~/composables/useOptionItems';

interface GradeOption {
  identificadorExterno: string;
  nome: string;
}

const props = defineProps<{
  grades: GradeOption[];
  selectedIdentifier: string | null;
  isEditing: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  'update:selectedIdentifier': [value: string | null];
}>();

const items = computed<ParsedItem[]>(() =>
  props.grades.map(grade => ({
    label: grade.nome,
    value: grade.identificadorExterno,
  })),
);

const selectedOption = computed<string | null>({
  get: () => props.selectedIdentifier,
  set: (value) => emit('update:selectedIdentifier', value ?? null),
});

const selectedGradeName = computed(() => {
  if (!props.selectedIdentifier) return 'Nenhuma grade selecionada';
  const grade = props.grades.find(
    g => g.identificadorExterno === props.selectedIdentifier,
  );
  return grade?.nome ?? 'Grade desconhecida';
});
</script>

<template>
  <div class="flex flex-col gap-1"  v-if="isEditing && !disabled">
      <UIFormOptionFieldsAutocomplete
        v-model:selected-option="selectedOption"
        label="Grade horária"
        placeholder="Selecione uma grade horária"
        :items="items"
        :disabled="disabled"
      />
  </div>
</template>
