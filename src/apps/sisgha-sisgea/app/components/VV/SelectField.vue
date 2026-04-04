<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  label?: string;
  placeholder?: string;
  items: Array<{ label: string; value: string | number }>;
  disabled?: boolean;
}>();

const {
  errorMessage,
  value: modelValue,
} = useField<ParsedItem | undefined>(
  props.name,
  undefined,
  { validateOnValueUpdate: false },
);
</script>

<template>
  <div class="flex flex-col gap-1">
    <UIFormOptionFieldsSelect
      v-model="modelValue"
      :items="items"
      :label="label"
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="$attrs"
    />
    <p v-if="errorMessage" class="text-ldsa-red text-xs font-semibold px-1">
      {{ errorMessage }}
    </p>
  </div>
</template>
