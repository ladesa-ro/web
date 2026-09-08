<script lang="ts" setup>
import { useField } from 'vee-validate';
import FormColorPalette from './FormColorPalette.vue';
import { useFieldDisabled } from './form-context';

export type VVColorPaletteProps = {
  name: string;
  colors?: string[];
  disabled?: boolean;
};

const props = defineProps<VVColorPaletteProps>();

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
  <FormColorPalette
    v-model="fieldValue"
    :colors="colors"
    :disabled="fieldDisabled"
    :error="errorMessage"
  />
</template>
