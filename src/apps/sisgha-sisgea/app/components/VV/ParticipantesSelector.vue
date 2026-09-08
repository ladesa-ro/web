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
  <div class="u-flex u-flex-col u-gap-1">
    <SectionCalendarioFormSharedParticipantesSelector
      :model-value="fieldValue"
      :disabled="fieldDisabled"
      @update:model-value="fieldValue = $event"
    />

    <p
      v-if="errorMessage"
      class="error-message u-text-xs u-font-semibold u-px-1"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.error-message {
  color: var(--ladesa-red-color);
}
</style>
