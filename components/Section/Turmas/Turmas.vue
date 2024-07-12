<script lang="ts" setup>
import { ref } from 'vue';

const searchBarText = ref('');
</script>

<template>
  <v-container class="flex-1">
    <div class="flex-1 h-full flex flex-col container mx-auto max-w-[89%]">
      <div
        class="container-header w-full justify-between items-center flex gap-4 px-3"
      >
        <UISearchBar
          :value="searchBarText"
          @update:value="searchBarText = $event"
        />

        <div class="flex items-center flex-shrink-0">
          <SectionTurmasModal />
        </div>
      </div>

      <SectionTurmasGrid :searchBarText="searchBarText" />
    </div>
  </v-container>
</template>

<style scoped>
.container-header {
  padding: 50px 0;
}
</style>
