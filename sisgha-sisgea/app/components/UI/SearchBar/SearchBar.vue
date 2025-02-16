<script lang="ts" setup>
type Props = {
  value?: string;
};

const props = defineProps<Props>();

//

const emits = defineEmits(['update:value']);

const localValue = ref(props.value);

watch(localValue, newValue => {
  emits('update:value', newValue);
});

watch(
  () => props.value,
  newValue => {
    if (newValue !== localValue.value) {
      localValue.value = newValue;
    }
  }
);
</script>

<template>
  <div class="searchField">
    <UITextFieldBase
      v-model="localValue"
      append-inner-icon="mdi-magnify"
      clearable
      label="Pesquisar"
      placeholder="Digite Aqui"
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
