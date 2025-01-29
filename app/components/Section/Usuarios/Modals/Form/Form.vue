<script lang="ts" setup>
import FormWithContent from './FormWithContent.vue';

type Props = {
  editId?: string | null;
};

const { editId = null } = defineProps<Props>();
</script>

<template>
  <DialogModalEditOrCreateModal
    :form-component="FormWithContent"
    :edit-id="editId"
  />
</template>
