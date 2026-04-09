<script lang="ts" setup>
import { useVVField } from './-Helpers/useVVField';

const props = defineProps<{
  name: string;
  label?: string;
  placeholder?: string;
  items: Array<{ label: string; value: string | number }>;
  disabled?: boolean;
}>();

const {
  fieldValue: modelValue,
  errorMessage,
  fieldDisabled,
} = useVVField<ParsedItem | undefined>({
  name: props.name,
  disabled: props.disabled,
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <UIFormOptionFieldsSelect
      v-model="modelValue"
      :items="items"
      :label="label"
      :placeholder="placeholder"
      :disabled="fieldDisabled"
      v-bind="$attrs"
    />
    <p v-if="errorMessage" class="text-ldsa-red text-xs font-semibold px-1">
      {{ errorMessage }}
    </p>
  </div>
</template>
