<template>
  <DialogSkeleton v-model="isOpen">
    <ModalBaseLayout
      v-if="isOpen"
      :title="props.title || 'Confirmação'"
      :closeButton="true"
      :onClose="cancel"
    >
      <p class="text-gray-800">{{ props.message }}</p>

      <template #button-group>
        <button
          class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          @click="cancel"
        >
          Cancelar
        </button>
        <button
          class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          @click="confirm"
        >
          Confirmar
        </button>
      </template>
    </ModalBaseLayout>
  </DialogSkeleton>
</template>

<script lang="ts" setup>
import ModalBaseLayout from '../Modal/ModalBaseLayout.vue';
import { ref, watch } from 'vue';

interface Props {
  modelValue: boolean;
  title?: string;
  message: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm'): void;
}>();

const isOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  val => (isOpen.value = val)
);
watch(isOpen, val => emit('update:modelValue', val));

function cancel() {
  isOpen.value = false;
}

function confirm() {
  isOpen.value = false;
  emit('confirm');
}
</script>
