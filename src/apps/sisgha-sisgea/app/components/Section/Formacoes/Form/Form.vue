<script lang="ts" setup>
import Form1 from './Form1.vue';
import Form2 from './Form2.vue';

type Props = { editId?: string | null };

withDefaults(defineProps<Props>(), {
  editId: null,
});

const $emit = defineEmits(['close']);

const currentModal = ref(1);
</script>

<template>
  <Form1
    v-if="currentModal === 1"
    :edit-id="editId"
    @close="$emit('close')"
    @next="currentModal = 2"
  />

  <Form2
    v-else-if="currentModal === 2"
    :edit-id="editId"
    :duracao-perido="12"
    @previous="currentModal = 1"
    @close="$emit('close')"
  />
</template>
