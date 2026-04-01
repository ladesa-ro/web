<script setup lang="ts">
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

const selectedGradeName = computed(() => {
  if (!props.selectedIdentifier) return 'Nenhuma grade selecionada';
  const grade = props.grades.find(
    g => g.identificadorExterno === props.selectedIdentifier,
  );
  return grade?.nome ?? 'Grade desconhecida';
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="text-xs font-medium text-ldsa-text-default">
      Grade horária
    </label>

    <template v-if="isEditing && !disabled">
      <select
        :value="props.selectedIdentifier ?? ''"
        class="border border-ldsa-grey rounded-md px-2 py-1.5 text-sm bg-white"
        @change="emit('update:selectedIdentifier', ($event.target as HTMLSelectElement).value || null)"
      >
        <option value="">Selecione uma grade horária</option>
        <option
          v-for="grade in props.grades"
          :key="grade.identificadorExterno"
          :value="grade.identificadorExterno"
        >
          {{ grade.nome }}
        </option>
      </select>
    </template>

    <template v-else>
      <span class="text-sm text-ldsa-text-default">
        {{ selectedGradeName }}
      </span>
    </template>
  </div>
</template>
