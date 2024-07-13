<script setup lang="ts">
import { useUIApiListContext } from '../Context/UIApiListContext';

const { searchBarText } = useUIApiListContext();
</script>

<template>
  <div class="py-[50px] w-full justify-between items-center flex gap-4 px-3">
    <UISearchBar
      :value="searchBarText"
      @update:value="searchBarText = $event"
    />

    <div class="flex items-center flex-shrink-0">
      <SectionTurmasModal />
    </div>
  </div>
</template>
