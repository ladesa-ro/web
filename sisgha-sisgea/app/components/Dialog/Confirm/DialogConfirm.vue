<script lang="ts" setup>
import { ref, watch } from 'vue';
import ModalBaseLayout from '../Modal/ModalBaseLayout.vue';

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

<template>
  <DialogSkeleton v-model="isOpen">
    <ModalBaseLayout
      v-if="isOpen"
      :title="props.title || 'Confirmação'"
      :closeButton="true"
      :onClose="cancel"
    >
      <p class="text-ldsa-grey text-center mx-auto max-w-[18rem] break-words">
        {{ props.message }}
      </p>

      <template #button-group>
        <UIButtonModalCancel @click="cancel" type="close" class="flex w-full" />
        <UIButtonModalConfirm type="submit" @click="confirm" />
      </template>
    </ModalBaseLayout>
  </DialogSkeleton>
</template>