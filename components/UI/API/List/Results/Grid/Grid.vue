<script setup lang="ts">
import { useUIApiListContext } from '../../Context/UIApiListContext';

const { searchBarText } = useUIApiListContext();

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
