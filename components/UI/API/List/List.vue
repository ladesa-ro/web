<script lang="ts" setup>
import { setupUIApiListContext } from './Context/UIApiListContext';

setupUIApiListContext();
</script>

<template>
  <v-container class="flex-1">
    <div class="flex-1 h-full flex flex-col container mx-auto max-w-[89%]">
      <UIAPIListOptions />
      <UIAPIListResults />
    </div>
  </v-container>
</template>
