<script setup lang="ts">
import { createApiListContextOptions } from "~/components/UI/API/List/Context/UIApiListContext";
import { campiBaseQueryKey, useCursosRetriever } from "~/integrations/api";

const cursosRetriever = useCursosRetriever();

const options = createApiListContextOptions({
  baseQueryKey: campiBaseQueryKey,
  apiBaseResourceListRetriever: cursosRetriever,
});
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <LazySectionCursosModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionCursosGridItem :item="item" :isLoading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionCursosGridItem :item="null" :isLoading="true" />
    </template>
  </UIAPIList>
</template>
