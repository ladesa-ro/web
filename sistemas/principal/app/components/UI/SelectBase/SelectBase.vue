<script setup lang="ts">
const modelValue = defineModel('value', { default: null });
</script>

<template>
  <div class="selectBaseField">
    <v-select
      v-bind="$attrs"
      v-model:model-value="modelValue"
      clearable
      color="var(--ladesa-green-2-color)"
      variant="outlined"
      hide-details="auto"
      base-color="var(--ladesa-grey-color)"
      persistent-placeholder
    />
  </div>
</template>

<style>
@reference "~/assets/styles/app.css";

.v-input__details {
  text-align: start !important;
  padding-left: 0px !important;
}

.selectBaseField {
  display: block;
  width: 100%;
}

.selectBaseField .v-field--variant-outlined .v-field__outline__start {
  flex-basis: 22px;
}

.selectBaseField .v-field {
  border-radius: 8px;
}

.selectBaseField .v-field__input {
  min-height: 48px;
  padding: 13px 0 13px 16px;
  font-size: 14px;
  font-weight: 550;
  @apply text-ldsa-text-default;
}

.selectBaseField input {
  width: min-content;
}

.selectBaseField .v-label {
  --v-medium-emphasis-opacity: 1 !important;
}

.v-label.v-field-label.v-field-label--floating {
  font-weight: 600;
}

.selectBaseField .v-field__input::placeholder {
  @apply text-ldsa-grey;
  --v-disabled-opacity: 1 !important;
}

.selectBaseField .v-field .v-field__outline {
  --v-field-border-width: 2px !important;
  --v-field-border-opacity: 1 !important;
}

.selectBaseField .v-field:not(.v-field--error) .v-field__outline {
  --v-border-color: var(--ladesa-grey-color);
  @apply text-ldsa-grey;
}
</style>
