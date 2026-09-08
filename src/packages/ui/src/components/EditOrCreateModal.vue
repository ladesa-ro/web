<script lang="ts" setup>
import type { Component } from 'vue';
import { ref } from 'vue';
import ButtonAdd from './ButtonAdd.vue';
import ButtonEdit from './ButtonEdit.vue';
import DialogSkeleton from './DialogSkeleton.vue';

export type EditOrCreateModalProps = {
  editId?: string | null;
  formComponent: Component;
  formProps?: Record<string, unknown> | null;
};

const { editId = null } = defineProps<EditOrCreateModalProps>();

const isActive = ref(false);

const onClose = () => (isActive.value = false);
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <component :is="editId ? ButtonEdit : ButtonAdd" />
    </template>

    <component
      :is="formComponent"
      v-bind="formProps"
      :edit-id="editId"
      @close="onClose"
    />
  </DialogSkeleton>
</template>
