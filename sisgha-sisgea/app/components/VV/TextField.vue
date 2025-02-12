<script lang="ts" setup>
import { useField } from 'vee-validate';

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
    v-model:value="modelValue"
    :error-messages="errorMessage ? [errorMessage] : []"
    :name="name"
    :type="type"
    persistent-hint
    v-bind="$attrs"
    @blur="handleBlur"
  />
</template>

<style>
@reference "~/assets/styles/app.css";

.help-message {
  @apply text-ldsa-red;
  font-size: 12px;
  font-weight: 500;
  text-align: start;
  margin-top: 2px;
}
</style>
