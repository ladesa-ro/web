<script setup lang="ts">
import { useAPIFormContext } from '../Context';

type Props = {
  isBusy?: boolean;
  isLoading?: boolean;

  titleEdit: string;
  titleCreate: string;

  onClose: () => void;
  onDelete?: (id: any) => Promise<void>;
};

defineProps<Props>();

//

type Slots = {
  default(props: any): any;
};

defineSlots<Slots>();

//

const { editId } = useAPIFormContext();
</script>

<template>
  <DialogModalBaseLayout
    :on-close="onClose"
    :title="editId ? titleEdit : titleCreate"
  >
    <UILoading v-if="isLoading" />
    <slot v-else />

    <template #button-group>
      <UIButtonModalCancelButton :disabled="isBusy" @click="onClose" />

      <UIButtonModalEditButton v-if="editId" :disabled="isLoading || isBusy" />
      <UIButtonModalSaveButton v-else :disabled="isLoading || isBusy" />
    </template>
  </DialogModalBaseLayout>
</template>
