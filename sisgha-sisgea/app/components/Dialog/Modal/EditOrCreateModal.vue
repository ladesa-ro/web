<script lang="ts" setup>
import ButtonAdd from '~/components/UI/Button/Add/Add.vue';
import ButtonEdit from '~/components/UI/Button/Edit/Edit.vue';
import type { FormComponent } from './FormComponent';

type Props = {
  editId?: string | null;
  formComponent: FormComponent;
};

const { editId = null } = defineProps<Props>();

//

const isActive = ref(false);
const onClose = () => (isActive.value = false);
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <component :is="editId ? ButtonEdit : ButtonAdd" />
    </template>

    <component :is="formComponent" :edit-id="editId" @close="onClose" />
  </DialogSkeleton>
</template>
