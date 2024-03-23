<script lang="ts" setup>
import { defineProps, toRef } from 'vue';
import { useField } from 'vee-validate';


  const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: '',
  }
});

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, 
  {
    initialValue: props.value,
    validateOnValueUpdate: false,
  }
);


</script>


<template>
  <div class="textField">
    <UITextFieldBase :name="name" :id="name" :type="type" @input="handleChange" :error-messages="errorMessage ? [errorMessage] : []"
    @blur="handleBlur" persistent-hint variant="outlined" persistent-placeholder v-bind="$attrs" />
 
 </div>
</template>

<style>
.textField {
  display: block;
  width: 100%;
}

.help-message {
  color: #f44336;
  font-size: 12px;
  font-weight: 500;
  text-align: start;
  margin-top: 2px;
}

.textField .v-field--variant-outlined .v-field__outline__start {
  flex-basis: 22px;
}

.textField .v-field {
  border-radius: 8px;
}

.textField .v-field--variant-outlined.v-field--focused .v-field__outline,
.textField .v-field .v-field__outline {
  --v-field-border-width: 3px !important;
  --v-field-border-opacity: 1 !important;
}

.textField .v-field__input {
  min-height: 48px;
  padding: 4px 16px;
  font-size: 14px;
  font-weight: 550;
}

.textField .v-label {
  --v-medium-emphasis-opacity: 1 !important;
}

.v-label.v-field-label.v-field-label--floating {
  font-weight: 600;
}

.textField .v-field__input::placeholder {
  color: #c8d7ca;
  --v-disabled-opacity: 1 !important;
}
</style>
