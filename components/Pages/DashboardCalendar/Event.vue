<script lang="ts" setup>
// Interface and types

// Props

type Props = {
  id?: string;

  name?: string;
  details?: string;
  color?: string;

  locale?: string;
};

const props = defineProps<Props>();

// Event
</script>

<template>
  <v-card class="-event flex-shrink-0 mx-auto rounded-lg w-full" height="128px">
    <div class="w-2 h-full" :style="{ backgroundColor: props.color }"></div>

    <v-container class="flex flex-col w-full h-full">
      <p class="font-semibold">{{ props.name }}</p>
      <p class="font-medium h-full mb-auto">{{ props.details }}</p>

      <p class="font-medium" v-if="props.locale">{{ props.locale }}</p>
    </v-container>
  </v-card>
</template>

<style scoped>
.-event {
  display: flex;
  flex-direction: row;

  height: 128px !important;

  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border: solid 2px #9ab69e;
  box-shadow: none;
}
</style>
