<script lang="ts" setup>
import { useVVField } from './-Helpers/useVVField';

const props = defineProps<{
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}>();

const {
  fieldValue: modelValue,
  errorMessage,
  fieldDisabled,
} = useVVField<string | null>({
  name: props.name,
  disabled: props.disabled,
  required: props.required,
});
</script>

<template>
  <UIFormTimeField
    v-model="modelValue"
    :label="props.label"
    :disabled="fieldDisabled"
    :error="errorMessage"
  />
</template>
