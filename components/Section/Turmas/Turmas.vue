<script lang="ts" setup>
import { ref } from 'vue';

const searchBarText = ref('');
</script>

<template>
  <v-container>
    <div class="container mx-auto max-w-[89%]">
      <div
        class="container-header mx-auto justify-between items-center flex mb-5 gap-4 px-3"
      >
        <UISearchBar
          :value="searchBarText"
          @update:value="searchBarText = $event"
        />

        <div class="flex items-center flex-shrink-0">
          <SectionTurmasModal />
        </div>
      </div>
      <div>
        <SectionTurmasGrid :searchBarText="searchBarText" />
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.container-header {
  padding: 50px 0;
}
</style>
