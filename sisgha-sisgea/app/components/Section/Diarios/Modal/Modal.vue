<script lang="ts" setup>
type Props = {
  editId?: string | null;
};

const { editId = null } = defineProps<Props>();

//

const isActive = ref(false);

const onClose = () => (isActive.value = false);
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <UIButtonAddDiary v-if="!editId" />
      <UIButtonEdit v-else />
    </template>
    <SectionDiariosFormGeral @close="onClose" />
  </DialogSkeleton>
</template>
