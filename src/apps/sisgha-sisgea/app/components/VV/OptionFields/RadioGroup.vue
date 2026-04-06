<script lang="ts" setup>
import { useField } from 'vee-validate';

type RadioItem = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

const props = defineProps<{
  name: string;
  items: RadioItem[];
  label?: string;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
}>();

const {
  value: fieldValue,
  errorMessage,
} = useField<string | number>(
  () => props.name,
  undefined,
  {
    validateOnValueUpdate: false,
  },
);
</script>

<template>
  <div class="flex flex-col gap-1">
    <UIFormOptionFieldsRadioGroup
      v-model="fieldValue"
      :items="items"
      :label="label"
      :disabled="disabled"
      :orientation="orientation"
    />

    <p v-if="errorMessage" class="text-ldsa-red text-xs font-semibold px-1">
      {{ errorMessage }}
    </p>
  </div>
</template>
