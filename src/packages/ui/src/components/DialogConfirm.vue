<script lang="ts" setup>
import { ref, watch } from 'vue';
import ButtonModalCancel from './ButtonModalCancel.vue';
import ButtonModalConfirm from './ButtonModalConfirm.vue';
import DialogSkeleton from './DialogSkeleton.vue';
import ModalBaseLayout from './ModalBaseLayout.vue';

export type DialogConfirmProps = {
  modelValue: boolean;
  title?: string;
  message: string;
};

const props = defineProps<DialogConfirmProps>();

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

const cancel = () => (isOpen.value = false);

const confirm = () => {
  isOpen.value = false;
  emit('confirm');
};
</script>

<template>
  <DialogSkeleton v-model="isOpen">
    <ModalBaseLayout
      v-if="isOpen"
      :title="props.title || 'Confirmação'"
      :close-button="true"
      :on-close="cancel"
    >
      <p class="ui-confirm-message">{{ props.message }}</p>

      <template #button-group>
        <ButtonModalCancel class="u-flex u-w-full" @click="cancel" />
        <ButtonModalConfirm @click="confirm" />
      </template>
    </ModalBaseLayout>
  </DialogSkeleton>
</template>
