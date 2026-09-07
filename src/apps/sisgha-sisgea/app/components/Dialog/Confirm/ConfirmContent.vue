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
    <p class="confirm-content__message">
      {{ message }}
    </p>

    <template #button-group>
      <UIButtonModalCancel
        type="close"
        class="u-flex u-w-full"
        @click="emit('cancel')"
      />
      <UIButtonModalConfirm type="submit" @click="emit('confirm')" />
    </template>
  </ModalBaseLayout>
</template>

<style scoped>
.confirm-content__message {
  color: var(--ladesa-grey-color);
  text-align: center;
  margin-inline: auto;
  max-width: 18rem;
  overflow-wrap: break-word;
}
</style>
