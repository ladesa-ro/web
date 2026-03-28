<script lang="ts" setup>
const $emit = defineEmits(['edit']);

//

type Props = {
  searchBarText?: string;
};

const { searchBarText } = defineProps<Props>();

const diarios_api = useDiarios();

const queries = computed(() => ({ search: searchBarText }));

const listQuery = diarios_api.list(queries);

const diarios = computed(() => listQuery.data.value?.data ?? null);

await listQuery.suspense();
</script>

<template>
  <UIGrid :items="diarios">
    <template #item="{ item: diario }">
      <SectionDiariosGridItem :diario="diario" />
    </template>
  </UIGrid>
</template>
