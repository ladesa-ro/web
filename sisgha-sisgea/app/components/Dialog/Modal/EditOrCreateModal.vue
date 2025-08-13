<script lang="ts" setup>
import ButtonAdd from '~/components/UI/Button/Add/Add.vue';
import ButtonEdit from '~/components/UI/Button/Edit/Edit.vue';
import type { FormComponent } from './FormComponent';
import type { Component } from 'vue';

type Props = {
  editId?: string | null;
  formComponent: FormComponent | Component;
  formProps?: Record<string, any> | null;
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

    <component
      :is="formComponent"
      v-bind="formProps"
      :edit-id="editId"
      @close="onClose"
    />
  </DialogSkeleton>
</template>
