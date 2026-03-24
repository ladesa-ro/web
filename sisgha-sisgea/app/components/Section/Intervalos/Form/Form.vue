<script setup lang="ts">
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
    <UIButtonModalConfirm
      class="self-center"
      @click="handleConfirm"
    />
    <UIButtonModalCancel
      v-if="props.onCancel"
      class="self-center"
      @click="props.onCancel"
    />
  </div>
</template>
