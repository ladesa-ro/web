<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef } from 'vue';

//

type Props = {
  type: string;
  value?: string;
  name: string;
  successMessage?: string;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  value: undefined,
  successMessage: '',
});

//

const name = toRef(props, 'name');

const {
  errorMessage,
  handleBlur,
  value: modelValue,
} = useField(name, undefined, {
  initialValue: props.value ?? undefined,
  validateOnValueUpdate: false,
});
</script>

<template>
  <UITextFieldBase
    v-bind="$attrs"
    v-model:value="modelValue"
    :name="name"
    :type="type"
    :error-messages="errorMessage ? [errorMessage] : []"
    persistent-hint
    @blur="handleBlur"
  />
</template>

<style>
.help-message {
  @apply text-ldsa-red;
  font-size: 12px;
  font-weight: 500;
  text-align: start;
  margin-top: 2px;
}
</style>
