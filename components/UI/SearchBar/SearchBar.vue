<template>
  <div class="searchField">
    <UITextFieldBase v-model="localValue" label="Pesquisar" placeholder="Digite Aqui" append-inner-icon="mdi-magnify" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  value: String
});

const emits = defineEmits(['update:value']);

const localValue = ref(props.value);

watch(localValue, (newValue) => {
  emits('update:value', newValue);
});

watch(() => props.value, (newValue) => {
  if (newValue !== localValue.value) {
    localValue.value = newValue;
  }
});
</script>

<style>
.searchField {
  display: block;
  max-width: 480px;
  width: 100%;
}
</style>
