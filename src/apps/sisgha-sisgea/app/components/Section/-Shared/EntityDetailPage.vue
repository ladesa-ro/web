<script lang="ts" setup>
import type { Component, VNode } from 'vue';

type Props = {
  resourceId: string;
  formComponent: Component;
  title?: string | null;
  subtitle?: string | null;
  imageSrc?: string | null;
  isLoading?: boolean;
  isError?: boolean;
  deleteMessage: string;
  remove: (id: string) => Promise<unknown>;
  invalidate: () => Promise<unknown>;
  redirectTo: string;
};

const props = defineProps<Props>();

defineSlots<{ details(): VNode[]; related?(): VNode[] }>();

const { confirmDelete, handleDelete } = useResourceDelete({
  remove: id => props.remove(id),
  invalidate: () => props.invalidate(),
  redirectTo: props.redirectTo,
});
</script>

<template>
  <UIResourceView
    :title="title ?? ''"
    :subtitle="subtitle"
    :image-src="imageSrc"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #breadcrumb />

    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="formComponent"
      />
      <UIButtonModalDelete @click="handleDelete(resourceId)" />
    </template>

    <template #details>
      <slot name="details" />
    </template>

    <template v-if="$slots.related" #related>
      <slot name="related" />
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    :message="deleteMessage"
    @confirm="confirmDelete.onConfirm"
  />
</template>
