<script lang="ts" setup>
import { useField } from 'vee-validate';

interface IParticipantesData {
  todosParticipam: boolean;
  turmas: Array<{ id: string }>;
  perfis: Array<{ id: string }>;
  ofertasFormacao: Array<{ id: string }>;
}

const props = defineProps<{
  name: string;
  disabled?: boolean;
}>();

const fieldDisabled = useFieldDisabled(() => props.disabled);

const { value: fieldValue, errorMessage } = useField<IParticipantesData>(
  () => props.name,
  undefined,
  {
    validateOnValueUpdate: false,
  }
);
</script>

<template>
  <div class="flex flex-col gap-1">
    <SectionCalendarioFormSharedParticipantesSelector
      :model-value="fieldValue"
      :disabled="fieldDisabled"
      @update:model-value="fieldValue = $event"
    />

    <p v-if="errorMessage" class="text-ldsa-red text-xs font-semibold px-1">
      {{ errorMessage }}
    </p>
  </div>
</template>
