<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  disabled?: boolean;
}>();

const {
  value: fieldValue,
  errorMessage,
} = useField<string | null>(
  () => props.name,
  undefined,
  {
    validateOnValueUpdate: false,
  },
);
</script>

<template>
  <UIFormRRuleEditorRRuleEditor
    v-model="fieldValue"
    :disabled="disabled"
    :error="errorMessage"
  />
</template>
