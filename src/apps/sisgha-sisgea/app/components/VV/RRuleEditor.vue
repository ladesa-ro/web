<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  disabled?: boolean;
}>();

const fieldDisabled = useFieldDisabled(() => props.disabled);

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
  <UIFormRRuleEditor
    v-model="fieldValue"
    :disabled="fieldDisabled"
    :error="errorMessage"
  />
</template>
