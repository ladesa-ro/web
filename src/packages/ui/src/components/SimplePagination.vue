<script setup lang="ts">
export type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const props = defineProps<PaginationProps>();
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
  <div v-if="totalPages > 1" class="ui-pagination">
    <button
      :disabled="currentPage <= 1"
      class="ui-pagination__button"
      @click="prevPage"
    >
      Anterior
    </button>
    <span class="ui-pagination__label"
      >{{ currentPage }} / {{ totalPages }}</span
    >
    <button
      :disabled="currentPage >= totalPages"
      class="ui-pagination__button"
      @click="nextPage"
    >
      Próximo
    </button>
  </div>
</template>
