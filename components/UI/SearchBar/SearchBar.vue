<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  value: String,
});

const emits = defineEmits(['update:value']);

const localValue = ref(props.value);

watch(localValue, (newValue) => {
  emits('update:value', newValue);
});

watch(
  () => props.value,
  (newValue) => {
    if (newValue !== localValue.value) {
      localValue.value = newValue;
    }
  }
);
</script>

<template>
  <div class="searchField">
    <UITextFieldBase
      clearable
      label="Pesquisar"
      v-model="localValue"
      placeholder="Digite Aqui"
      append-inner-icon="mdi-magnify"
    />
  </div>
</template>

<style>
.searchField {
  display: block;
  max-width: 480px;
  width: 100%;
}
</style>
