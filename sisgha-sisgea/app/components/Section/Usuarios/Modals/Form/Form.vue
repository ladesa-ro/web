<script lang="ts" setup>
import type { DefineComponent } from 'vue';
import FormWithContent from './FormWithContent.vue';

type Props = { editId?: string | null };
const { editId = null } = defineProps<Props>();

const formComponent = FormWithContent as DefineComponent<{ editId?: string | null }>;
</script>

<template>
  <DialogModalEditOrCreateModal
    :edit-id="editId"
    :form-component="formComponent"
  />
</template>
