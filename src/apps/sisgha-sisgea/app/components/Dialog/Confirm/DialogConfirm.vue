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
      :close-button="true"
      :on-close="cancel"
    >
      <p class="dialog-confirm__message">
        {{ props.message }}
      </p>

      <template #button-group>
        <UIButtonModalCancel
          type="close"
          class="u-flex u-w-full"
          @click="cancel"
        />
        <UIButtonModalConfirm type="submit" @click="confirm" />
      </template>
    </ModalBaseLayout>
  </DialogSkeleton>
</template>

<style scoped>
.dialog-confirm__message {
  color: var(--ladesa-grey-color);
  text-align: center;
  margin-inline: auto;
  max-width: 18rem;
  overflow-wrap: break-word;
}
</style>
