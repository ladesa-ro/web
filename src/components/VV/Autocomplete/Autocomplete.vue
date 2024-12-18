<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef } from 'vue';

const searchValue = defineModel('search', { default: '' });

//

type Props = {
  name: string;
};

const props = defineProps<Props>();

//

const name = toRef(props, 'name');

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
      clearable
      :name="name"
      @blur="handleBlur"
      hide-details="auto"
      persistent-placeholder
      v-model:value="modelValue"
      v-model:search="searchValue"
      :error-messages="errorMessage ? [errorMessage] : []"
      v-bind="$attrs"
    />
  </div>
</template>
