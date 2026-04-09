<script setup lang="ts">
type Props = {
  currentPage: number;
  totalPages: number;
};

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:currentPage': [page: number];
}>();

function prevPage() {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
}

function nextPage() {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1);
  }
}
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="flex justify-center items-center gap-4 py-2"
  >
    <button
      :disabled="currentPage <= 1"
      class="px-3 py-1.5 rounded border border-ldsa-grey/30 text-sm disabled:opacity-40"
      @click="prevPage"
    >
      Anterior
    </button>
    <span class="text-sm text-ldsa-grey"
      >{{ currentPage }} / {{ totalPages }}</span
    >
    <button
      :disabled="currentPage >= totalPages"
      class="px-3 py-1.5 rounded border border-ldsa-grey/30 text-sm disabled:opacity-40"
      @click="nextPage"
    >
      Próximo
    </button>
  </div>
</template>
