<template>
  <div class="autoCompleteField">
    <v-autocomplete
      hide-details="auto"
      base-color="#9ab69e"
      color="#00d047"
      clearable
      persistent-placeholder
      variant="outlined"
      v-bind="$attrs"
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
  color: black;
}

.autoCompleteField .v-label {
  --v-medium-emphasis-opacity: 1 !important;
}

.v-label.v-field-label.v-field-label--floating {
  font-weight: 600;
}

.autoCompleteField .v-field__input::placeholder {
  color: #c8d7ca;
  --v-disabled-opacity: 1 !important;
}

.autoCompleteField .v-field .v-field__outline {
  --v-field-border-width: 3px !important;
  --v-field-border-opacity: 1 !important;
}

.autoCompleteField .v-field .v-field__outline {
  --v-border-color: #9ab69e;
  color: #9ab69e;
}
</style>
