<script lang="ts" setup>
import { useField } from 'vee-validate';

//

type Props = {
  name: string;
};

const { name } = defineProps<Props>();

//

const searchValue = defineModel('search', { default: '' });

const {
  handleBlur,
  errorMessage,
  value: modelValue,
} = useField<string | null>(name, undefined, {
  validateOnValueUpdate: true,
});
</script>

<template>
  <div class="autoCompleteField">
    <UIAutocompleteBase
      v-model:search="searchValue"
      v-model:value="modelValue"
      :error-messages="errorMessage ? [errorMessage] : []"
      :name="name"
      clearable
      hide-details="auto"
      persistent-placeholder
      v-bind="$attrs"
      @blur="handleBlur"
    />
  </div>
</template>
