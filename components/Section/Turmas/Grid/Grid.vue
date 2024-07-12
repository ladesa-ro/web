<script setup lang="ts">
const props = defineProps<{ searchBarText: string }>();

const { searchBarText } = toRefs(props);

const { previousItems, isLoading } = await useApiTurmasFindAll(searchBarText);
</script>

<template>
  <UIGrid :isLoading="isLoading" :items="previousItems">
    <template #item="{ item: turma }">
      <SectionTurmasGridItem :turma="turma" :isLoading="isLoading" />
    </template>

    <template #item-skeleton>
      <SectionTurmasGridItem :turma="null" :isLoading="isLoading" />
    </template>
  </UIGrid>
</template>
