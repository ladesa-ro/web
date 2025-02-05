<script setup lang="ts">
//

const $emit = defineEmits(['edit']);

//

type Props = {
  searchBarText?: string;
};

const { searchBarText } = defineProps<Props>();

const {
  composables: { useListQuery },
} = useLadesaApiCrudDiarios();

const queries = computed(() => ({ search: searchBarText }));

const { items: diarios } = await useListQuery()(queries);
</script>

<template>
  <UIGrid :items="diarios">
    <template #item="{ item: diario }">
      <SectionDiariosGridItem :diario="diario" />
    </template>
  </UIGrid>
</template>
