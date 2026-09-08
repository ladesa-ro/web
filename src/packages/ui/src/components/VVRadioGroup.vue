<script lang="ts" setup>
import { useField } from 'vee-validate';
import FormRadioGroup from './FormRadioGroup.vue';

export type VVRadioGroupItem = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type VVRadioGroupProps = {
  name: string;
  items: VVRadioGroupItem[];
  label?: string;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
};

const props = defineProps<VVRadioGroupProps>();

const { value: fieldValue, errorMessage } = useField<string | number>(
  () => props.name,
  undefined,
  { validateOnValueUpdate: false }
);
</script>

<template>
  <div class="u-flex u-flex-col u-gap-1">
    <FormRadioGroup
      v-model="fieldValue"
      :items="items"
      :label="label"
      :disabled="disabled"
      :orientation="orientation"
    />

    <p
      v-if="errorMessage"
      class="ui-field-error u-text-xs u-font-semibold u-px-1"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
