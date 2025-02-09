<script setup lang="ts">
type Props = {
  mode: 'manage' | 'create';

  isBusy?: boolean;
  isLoading?: boolean;

  titleEdit: string;
  titleCreate: string;

  onClose: () => void;
  onDelete: () => void;
};

defineProps<Props>();
</script>

<template>
  <DialogModalBaseLayout
    :on-close="onClose"
    :title="mode === 'manage' ? titleEdit : titleCreate"
  >
    <UILoading v-if="isLoading" />
    <slot v-else />

    <template #button-group>
      <UIButtonModalCancelButton :disabled="isBusy" @click="onClose" />

      <template v-if="mode === 'manage'">
        <UIButtonModalDeleteButton
          :disabled="isBusy"
          @click.prevent="onDelete"
        />

        <UIButtonModalEditButton :disabled="isBusy" />
      </template>

      <template v-else>
        <UIButtonModalSaveButton :disabled="isBusy" />
      </template>
    </template>
  </DialogModalBaseLayout>
</template>
