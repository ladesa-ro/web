<script lang="ts" setup>
// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// Interface and types

// Props
const props = defineProps({
  id: String,
  name: String,
  color: String,
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  locale: String,
  startTime: dayjs.Dayjs,
  endTime: dayjs.Dayjs,
});

// Event
</script>

<template>
  <v-card class="-event flex-shrink-0 mx-auto rounded-lg w-full">
    <div class="w-2 h-full" :style="{ backgroundColor: props.color! }"></div>
    <v-container class="flex flex-col w-full h-full">
      <!-- Event -->
      <p class="font-semibold text-sm sm:text-[16px]">{{ props.name! }}</p>

      <!-- Infos -->
      <p class="font-medium text-sm sm:text-[16px]">Início: {{}} às {{}}</p>
      <p class="font-medium text-sm sm:text-[16px]">Término: {{}} às {{}}</p>

      <!-- Event duration -->
      <p
        class="font-medium text-sm sm:text-[16px]"
        :class="{ 'h-full mb-[16px]': props.locale! }"
      >
        Começa daqui {{}}.
      </p>

      <!-- Locale -->
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
</style>
