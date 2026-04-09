<script lang="ts" setup>
import ModalBaseLayout from '../Modal/ModalBaseLayout.vue';

const { title = 'Confirmação' } = defineProps<{
  title?: string;
  message: string;
}>();

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
    <p class="text-ldsa-grey text-center mx-auto max-w-[18rem] break-words">
      {{ message }}
    </p>

    <template #button-group>
      <UIButtonModalCancel
        type="close"
        class="flex w-full"
        @click="emit('cancel')"
      />
      <UIButtonModalConfirm type="submit" @click="emit('confirm')" />
    </template>
  </ModalBaseLayout>
</template>
