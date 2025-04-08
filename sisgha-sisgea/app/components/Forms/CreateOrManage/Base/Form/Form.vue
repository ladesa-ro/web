<script lang="ts" setup>
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
      <UIButtonModalCancel :disabled="isBusy" @click="onClose" />

      <template v-if="mode === 'manage'">
        <UIButtonModalDelete
          :disabled="isBusy"
          @click.prevent="onDelete"
        />

        <UIButtonModalEdit :disabled="isBusy" />
      </template>

      <template v-else>
        <UIButtonModalSave :disabled="isBusy" />
      </template>
    </template>
  </DialogModalBaseLayout>
</template>
