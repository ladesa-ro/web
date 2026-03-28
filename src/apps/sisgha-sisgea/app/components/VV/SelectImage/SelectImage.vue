<script lang="ts" setup>
import { useField } from 'vee-validate';

type Props = {
  name: string;
};
const props = defineProps<Props>();
const name = toRef(props, 'name');

type FieldType = File | Blob | null | undefined;

const { errorMessage, value: modelValue } = useField<FieldType>(
  name,
  undefined,
  { validateOnValueUpdate: true }
);
</script>

<template>
  <UISelectImage v-model="modelValue" v-bind="$attrs" />

  <div v-if="errorMessage">
    {{ errorMessage }}
  </div>
</template>
