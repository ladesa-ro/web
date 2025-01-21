<script lang="ts" setup>
import UIButtonAdd from '~/components/UI/ButtonAdd/ButtonAdd.vue';
import UIButtonEdit from '~/components/UI/ButtonEdit/ButtonEdit.vue';
import type { FormComponent } from './FormComponent';

type Props = {
  editId?: string | null;
  formComponent: FormComponent;
};

const { editId = null } = defineProps<Props>();

//

const isActive = ref(false); 
const onClose = () => isActive.value = false;
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <component :is="editId ? UIButtonEdit : UIButtonAdd" />
    </template>

    <component :is="formComponent" :edit-id="editId" @close="onClose" />
  </DialogSkeleton>
</template>
