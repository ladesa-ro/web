<script lang="ts" setup>
import { ref } from 'vue';

const searchBarText = ref('');
</script>

<template>
  <v-container>
    <div class="container mx-auto py-4 max-w-[89%]">
      <div
        class="flex container-header mx-auto justify-between items-center mb-5 gap-4 px-3"
      >
        <UISearchBar
          :value="searchBarText"
          @update:value="searchBarText = $event"
        />

        <div class="flex items-center flex-shrink-0">
          <SectionUsuariosModalsForm />
        </div>
      </div>

      <div>
        <SectionUsuariosGrid :search-bar-text="searchBarText" />
      </div>
    </div>
  </v-container>
</template>
<style scoped>
.container-header {
  padding: 50px 0;
}
</style>
