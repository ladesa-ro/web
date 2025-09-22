<script lang="ts" setup>
import { useToast } from '#imports';

type Props = {
  editId?: string | null;
};

const { editId = null } = defineProps<Props>();
const { showToast } = useToast();

const isActive = ref(false);

const onOpen = () => {
  isActive.value = true;
  showToast('cadastro', 'info', editId ? 'Editando diário...' : 'Criando novo diário...');
};

const onClose = () => {
  isActive.value = false;
  showToast('cadastro', 'info', 'Modal fechado.');
};
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <UIButtonAdd v-if="!editId" @click="onOpen" />
      <UIButtonEdit v-else @click="onOpen" />
    </template>
    <SectionDiariosFormGeral @close="onClose" />
  </DialogSkeleton>
</template>
