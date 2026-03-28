<script setup lang="ts">
const props = defineProps<{
  modelValue: { inicio: string; fim: string };
  onConfirm: () => void;
  onCancel?: () => void;
}>();

const emit = defineEmits(['update:modelValue']);

const errorMessage = ref('');

const inicio = computed({
  get: () => props.modelValue.inicio,
  set: (val: string) => {
    errorMessage.value = '';
    emit('update:modelValue', { ...props.modelValue, inicio: val });
  },
});

const fim = computed({
  get: () => props.modelValue.fim,
  set: (val: string) => {
    errorMessage.value = '';
    emit('update:modelValue', { ...props.modelValue, fim: val });
  },
});

function handleConfirm() {
  if (!inicio.value || !fim.value) {
    errorMessage.value = 'Início e término são obrigatórios.';
    return;
  }
  if (inicio.value >= fim.value) {
    errorMessage.value = 'Início deve ser anterior ao término.';
    return;
  }
  errorMessage.value = '';
  props.onConfirm();
}
</script>

<template>
  <div class="mt-3 pb-3 border-b border-ldsa-grey">
    <div class="flex flex-col lg:flex-row items-center gap-2">
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
      <UIButtonModalConfirm class="self-center" @click="handleConfirm" />
      <UIButtonModalCancel
        v-if="props.onCancel"
        class="self-center"
        @click="props.onCancel"
      />
    </div>
    <p v-if="errorMessage" class="text-ldsa-red text-sm mt-1">
      {{ errorMessage }}
    </p>
  </div>
</template>
