<script lang="ts" setup>
import ButtonModalCancel from './ButtonModalCancel.vue';
import ButtonModalConfirm from './ButtonModalConfirm.vue';
import ModalBaseLayout from './ModalBaseLayout.vue';

export type ConfirmContentProps = {
  title?: string;
  message: string;
};

const { title = 'Confirmação' } = defineProps<ConfirmContentProps>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <ModalBaseLayout
    :title="title"
    :close-button="true"
    :on-close="() => emit('cancel')"
  >
    <p class="ui-confirm-message">{{ message }}</p>

    <template #button-group>
      <ButtonModalCancel class="u-flex u-w-full" @click="emit('cancel')" />
      <ButtonModalConfirm @click="emit('confirm')" />
    </template>
  </ModalBaseLayout>
</template>
