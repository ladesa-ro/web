<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: { inicio: string; fim: string };
  onConfirm: () => void;
  onCancel?: () => void;
}>();

function handleConfirm() {
  props.onConfirm();
}

const emit = defineEmits(['update:modelValue']);

const inicio = computed({
  get: () => props.modelValue.inicio,
  set: (val: string) =>
    emit('update:modelValue', { ...props.modelValue, inicio: val }),
});

const fim = computed({
  get: () => props.modelValue.fim,
  set: (val: string) =>
    emit('update:modelValue', { ...props.modelValue, fim: val }),
});
</script>

<template>
  <div
    class="flex flex-col lg:flex-row items-center gap-2 mt-3 pb-3 border-b border-ldsa-grey"
  >
    <VVTextField
      v-model="inicio"
      type="time"
      label="Início"
      name="inicio"
      class="flex-1 min-w-[110px] self-start"
    />
    <VVTextField
      v-model="fim"
      type="time"
      label="Término"
      name="fim"
      class="flex-1 min-w-[110px] self-start"
    />
    <button
      @click="handleConfirm"
      class="bg-ldsa-green-1 px-2 py-3 rounded text-[0.75rem] text-ldsa-white self-center"
    >
      <IconsIconConfirm class="flex w-6 h-6" />
    </button>
    <button
      v-if="props.onCancel"
      @click="props.onCancel"
      class="bg-gray-400 px-2 py-1 rounded text-[0.75rem] text-white self-center"
    >
      Cancelar
    </button>
  </div>
</template>

