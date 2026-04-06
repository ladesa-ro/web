<script lang="ts" setup>
import { CargoOptions } from '~/utils/constants';

const value = defineModel<string | null>('value', { default: null });

defineProps<{
  errorMessages?: string[];
  onBlur?: () => void;
}>();

const roles = CargoOptions;
</script>

<template>
  <UIFormOptionFieldsAutocomplete
    v-model:selected-option="value"
    label="Função"
    placeholder="Selecione"
    :items="roles"
    :error="errorMessages?.[0]"
    :on-blur="onBlur"
  />
</template>
