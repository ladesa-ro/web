<script lang="ts" setup>
import { computed } from 'vue';
import DialogSkeleton from './DialogSkeleton.vue';

export type ManagedDialogBackdropAction = 'close-self' | 'close-all' | 'noop';

export type ManagedDialogManager = {
  isActive: (name: string) => boolean;
  close: (name: string) => void;
  closeAll: () => void;
};

export type ManagedDialogProps = {
  name: string;
  manager: ManagedDialogManager;
  backdropAction?: ManagedDialogBackdropAction;
};

const props = defineProps<ManagedDialogProps>();

const isActive = computed(() => props.manager.isActive(props.name));

const handleClose = (value: boolean) => {
  if (value) return;

  const action = props.backdropAction ?? 'close-all';

  if (action === 'close-self') {
    props.manager.close(props.name);
  } else if (action === 'close-all') {
    props.manager.closeAll();
  }
};
</script>

<template>
  <DialogSkeleton :model-value="isActive" @update:model-value="handleClose">
    <slot />
  </DialogSkeleton>
</template>
