<script setup lang="ts">
import { FormTextField } from '@ladesa-ro/web.ui';
import type { TextFieldProps } from '../-Utils/inputTypes';

defineOptions({ inheritAttrs: false });

type Props = TextFieldProps & { error?: string; modelValue?: string | number };

defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'blur']);
</script>

<template>
  <FormTextField
    v-bind="{ ...$props, ...$attrs }"
    @update:model-value="value => emit('update:modelValue', value)"
    @blur="emit('blur')"
  />
</template>
