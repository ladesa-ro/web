<script lang="ts" setup>
import { useField } from 'vee-validate';

const searchValue = defineModel('search', { default: '' });

//

type Props = {
  name: string;
};
const props = defineProps<Props>();
const name = toRef(props, 'name');

//

const {
  handleBlur,
  errorMessage,
  value: modelValue,
} = useField<string | null>(name.value, undefined, {
  validateOnValueUpdate: true,
});
</script>

<template>
  <div class="autoCompleteField">
    <UIAutocompleteBase
      v-model:value="modelValue"
      v-model:search="searchValue"
      clearable
      :name="name"
      hide-details="auto"
      persistent-placeholder
      :error-messages="errorMessage ? [errorMessage] : []"
      v-bind="$attrs"
      @blur="handleBlur"
    />
  </div>
</template>
