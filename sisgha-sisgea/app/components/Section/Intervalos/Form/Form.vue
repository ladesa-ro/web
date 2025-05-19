<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: { inicio: string; fim: string };
  onConfirm: () => void;
}>();

const emit = defineEmits(['update:modelValue']);

const inicio = computed({
  get: () => props.modelValue.inicio,
  set: (val: string) => emit('update:modelValue', { ...props.modelValue, inicio: val }),
});

const fim = computed({
  get: () => props.modelValue.fim,
  set: (val: string) => emit('update:modelValue', { ...props.modelValue, fim: val }),
});
</script>

<template>
  <div class="flex gap-2 mt-3 pb-3 border-b border-ldsa-grey">
    <VVTextField v-model="inicio" type="time" label="Início" name="inicio" />
    <VVTextField v-model="fim" type="time" label="Término" name="fim" />
    <button @click="onConfirm" class="bg-ldsa-green-1 px-2 py-1 rounded text-[0.75rem] text-ldsa-white">
      <IconsIconConfirm class="flex w-6 h-6 mr-4" />
    </button>
  </div>
</template>
