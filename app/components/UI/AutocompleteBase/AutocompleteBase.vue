<script setup lang="ts">
const searchValue = defineModel<string | undefined>('search', { default: '' });
const modelValue = defineModel<string | null>('value', { default: null });
</script>

<template>
  <div class="autoCompleteField">
    <v-autocomplete
      v-bind="$attrs"
      v-model:search="searchValue"
      v-model:model-value="modelValue"
      clearable
      color="#00d047"
      variant="outlined"
      hide-details="auto"
      base-color="#9ab69e"
      persistent-placeholder
    />
  </div>
</template>

<style>
.v-input__details {
  text-align: start !important;
  padding-left: 0px !important;
}

.autoCompleteField {
  display: block;
  width: 100%;
}

.autoCompleteField .v-field--variant-outlined .v-field__outline__start {
  flex-basis: 22px;
}

.autoCompleteField .v-field {
  border-radius: 8px;
}

.autoCompleteField .v-field__input {
  min-height: 48px;
  padding: 4px 16px;
  font-size: 14px;
  font-weight: 550;
  @apply text-ldsa-text-default;
}

.autoCompleteField .v-label {
  --v-medium-emphasis-opacity: 1 !important;
}

.v-label.v-field-label.v-field-label--floating {
  font-weight: 600;
}

.autoCompleteField .v-field__input::placeholder {
  @apply text-ldsa-grey;
  --v-disabled-opacity: 1 !important;
}

.autoCompleteField .v-field .v-field__outline {
  --v-field-border-width: 2px !important;
  --v-field-border-opacity: 1 !important;
}

.autoCompleteField .v-field:not(.v-field--error) .v-field__outline {
  --v-border-color: var(--ladesa-grey-color);
  @apply text-ldsa-grey;
}
</style>
