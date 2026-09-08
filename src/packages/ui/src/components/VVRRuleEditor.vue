<script lang="ts" setup>
import { useField } from 'vee-validate';
import RRuleEditor from './RRuleEditor.vue';
import { useFieldDisabled } from './form-context';

export type VVRRuleEditorProps = {
  name: string;
  disabled?: boolean;
};

const props = defineProps<VVRRuleEditorProps>();

const fieldDisabled = useFieldDisabled(() => props.disabled);

const { value: fieldValue, errorMessage } = useField<string | null>(
  () => props.name,
  undefined,
  {
    validateOnValueUpdate: false,
  }
);
</script>

<template>
  <RRuleEditor
    v-model="fieldValue"
    :disabled="fieldDisabled"
    :error="errorMessage"
  />
</template>
