<script lang="ts" setup>
import { useField } from 'vee-validate';

type Props = {
  name: string;
  disabled?: boolean;
  existingSrc?: string | null;
};
const props = defineProps<Props>();
const name = toRef(props, 'name');

type FieldType = File | Blob | null | undefined;

const fieldDisabled = useFieldDisabled(() => props.disabled);

const { errorMessage, value: modelValue } = useField<FieldType>(
  name,
  undefined,
  { validateOnValueUpdate: true }
);
</script>

<template>
  <div>
    <UISelectImage
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
