<script lang="ts" setup>
import FormSelect from './FormSelect.vue';
import type { ParsedOptionItem } from './option-item';
import { useVVField } from './vv-field';

export type VVSelectFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  items: Array<{ label: string; value: string | number }>;
  disabled?: boolean;
};

const props = defineProps<VVSelectFieldProps>();

const {
  fieldValue: modelValue,
  errorMessage,
  fieldDisabled,
} = useVVField<ParsedOptionItem | undefined>({
  name: props.name,
  disabled: () => props.disabled,
});
</script>

<template>
  <div class="u-flex u-flex-col u-gap-1">
    <FormSelect
      v-model="modelValue"
      :items="items"
      :label="label"
      :placeholder="placeholder"
      :disabled="fieldDisabled"
      v-bind="$attrs"
    />

    <p
      v-if="errorMessage"
      class="ui-field-error u-text-xs u-font-semibold u-px-1"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
