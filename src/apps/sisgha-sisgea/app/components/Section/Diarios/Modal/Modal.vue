<script lang="ts" setup>
type Props = {
  editId?: string | null;
};

const { editId = null } = defineProps<Props>();

const isActive = ref(false);

const onOpen = () => {
  isActive.value = true;
};

const onClose = () => {
  isActive.value = false;
};
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <UIButtonAdd v-if="!editId" @click="onOpen" />
      <UIButtonEdit v-else @click="onOpen" />
    </template>
    <SectionDiariosFormGeral :edit-id="editId" @close="onClose" />
  </DialogSkeleton>
</template>
