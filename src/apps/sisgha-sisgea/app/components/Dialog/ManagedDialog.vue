<script lang="ts" setup>
import type { IModalManagerReturn } from '~/composables/useModalManager';

type BackdropAction = 'close-self' | 'close-all' | 'noop';

const props = defineProps<{
  name: string;
  manager: Pick<IModalManagerReturn<string>, 'isActive' | 'close' | 'closeAll'>;
  backdropAction?: BackdropAction;
}>();

const isActive = computed(() => props.manager.isActive(props.name));

function handleClose(val: boolean) {
  if (!val) {
    const action = props.backdropAction ?? 'close-all';

    if (action === 'close-self') {
      props.manager.close(props.name);
    } else if (action === 'close-all') {
      props.manager.closeAll();
    }
  }
}
</script>

<template>
  <DialogSkeleton :model-value="isActive" @update:model-value="handleClose">
    <slot />
  </DialogSkeleton>
</template>
