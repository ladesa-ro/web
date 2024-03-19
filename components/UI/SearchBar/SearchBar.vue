<template>
  <div class="searchField">
    <v-text-field hide-details base-color="#9ab69e" color="#00d047" persistent-hint label="Pesquisar"
      placeholder="Digite Aqui" variant="outlined" persistent-placeholder clearable append-inner-icon="mdi-magnify"
      v-bind="$attrs" />
  </div>
</template>

<style>
.searchField {
  display: block;
  max-width: 480px;
  width: 100%;
}

.searchField .v-field {
  border-radius: 8px;
}

.searchField .v-field--variant-outlined.v-field--focused .v-field__outline,
.searchField .v-field .v-field__outline {
  --v-field-border-width: 3px !important;
  --v-field-border-opacity: 1 !important;
}

.searchField .v-field__input {
  min-height: 48px;
  padding: 4px 16px;
  font-size: 14px;
  font-weight: 550;
}

.searchField .v-label {
  --v-medium-emphasis-opacity: 1 !important;
}

.searchField .v-field__input::placeholder {
  color: #c8d7ca;
  --v-disabled-opacity: 1 !important;
}
</style>
