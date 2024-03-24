<template>
  <div class="autoCompleteField">
    <UIAutocompleteBase
      v-model="inputValue"
      :error-messages="errorMessage ? [errorMessage] : []"
      hide-details="auto"
      clearable
      persistent-placeholder
      @input="handleChange"
      @blur="handleBlur"
      :name="name"
      :id="name"
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
import { defineProps, toRef } from "vue";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
});

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name.value, undefined, {
  initialValue: props.value,
  validateOnValueUpdate: true,
});
</script>
