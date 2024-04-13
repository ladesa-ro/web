<template v-slot:search>
  <v-autocomplete
  label="Autocomplete"
  :items=options
  variant="outlined"
></v-autocomplete>
</template>

<script setup>
import { ref } from "vue";

const options = [
  "Técnico Integrado",
  "Técnico Subsequente",
  "Técnico Concomitante",
  "Graduação",
];

</script>

<style scoped>
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
