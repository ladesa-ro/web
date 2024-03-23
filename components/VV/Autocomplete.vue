<template>
  <div class="textField">
    <v-autocomplete
    v-model="inputValue"
    :error-messages="errorMessage ? [errorMessage] : []"
    hide-details="auto"
    clearable
    persistent-placeholder
    @input="handleChange"
    @blur="handleBlur"
    :name="name" 
    :id="name"
    variant="outlined"
    v-bind="$attrs"
  />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
});

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name.value, undefined, 
  {
    initialValue: props.value,
    validateOnValueUpdate: false,
  }
);
</script>

<style>
.v-input__details {
  text-align: start !important;
  padding-left: 0px !important;
}

  .textField {
    display: block;
    width: 100%;
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
    --v-border-color: #9ab69e !important;
    color: #9ab69e !important;
  }


  
  .textField .v-field__input {
    min-height: 48px;
    padding: 4px 16px;
    font-size: 14px;
    font-weight: 550;
    color: #9ab69e;
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
