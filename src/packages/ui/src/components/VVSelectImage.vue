<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef } from 'vue';
import SelectImage from './SelectImage.vue';
import { useFieldDisabled } from './form-context';

export type VVSelectImageProps = {
  name: string;
  disabled?: boolean;
  existingSrc?: string | null;
};

type FieldType = File | Blob | null | undefined;

const props = defineProps<VVSelectImageProps>();

const name = toRef(props, 'name');

const fieldDisabled = useFieldDisabled(() => props.disabled);

const { errorMessage, value: modelValue } = useField<FieldType>(
  name,
  undefined,
  { validateOnValueUpdate: true }
);
</script>

<template>
  <div>
    <SelectImage
      v-model="modelValue"
      :disabled="fieldDisabled"
      :existing-src="props.existingSrc"
      v-bind="$attrs"
    />

    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
