<script lang="ts" setup>
// Interface and types

// Props
const props = defineProps({
  id: String,
  name: String,
  details: String,
  locale: String,
  color: String,
});

// Event
</script>

<template>
  <v-card class="-event flex-shrink-0 mx-auto rounded-lg w-full">
    <div class="w-2 h-full" :style="{ backgroundColor: props.color! }"></div>
    <v-container class="flex flex-col w-full h-full">
      <p class="font-semibold text-sm sm:text-[16px]">{{ props.name! }}</p>
      <p
        class="font-medium text-sm sm:text-[16px]"
        :class="{ 'h-full mb-[16px]': props.locale! }"
      >
        {{ props.details! }}
      </p>
      <p class="font-medium text-sm sm:text-[16px]" v-show="props.locale!">
        {{ props.locale! }}
      </p>
    </v-container>
  </v-card>
</template>

<style scoped>
.-event {
  display: flex;
  flex-direction: row;

  height: max-content !important;

  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border: solid 2px #9ab69e;
}
