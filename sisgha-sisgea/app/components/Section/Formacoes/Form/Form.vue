<script lang="ts" setup>
import Form1 from './Form1.vue';

type Props = { editId?: string | null };

withDefaults(defineProps<Props>(), {
  editId: null,
});
</script>

<template>
  <Form1 :edit-id="editId" />
</template>
