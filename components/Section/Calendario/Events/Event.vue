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
});
</script>

<template>
  <v-card class="-event flex-shrink-0 mx-auto rounded-lg w-full">
    <v-container
      class="flex flex-col w-full h-full border-l-8"
      :style="{ borderLeftColor: props.color! }"
    >
      <!-- Event -->
      <p class="font-semibold text-sm sm:text-[16px]">{{ props.name! }}</p>

      <!-- Infos -->
      <p class="font-medium text-sm sm:text-[16px]">
        Início: {{ startDate?.format('DD/MM') }}
        <span v-show="startDate?.format('HH:mm') !== '00:00'"
          >às {{ startDate?.format('HH:mm') }}
        </span>
      </p>

      <!-- Days for start and end -->
      <p class="font-medium text-sm sm:text-[16px]">
        Término: {{ endDate?.format('DD/MM') }}
        <span v-show="endDate?.format('HH:mm') !== '00:00'"
          >às {{ endDate?.format('HH:mm') }}</span
        >
      </p>

      <!-- Event duration -->
      <p
        class="font-medium text-sm sm:text-[16px]"
        v-show="dayjs(dayjs().toDate()).isBefore(props.endDate)"
      >
        <!-- Days for start  -->
        <span>
          Começa daqui
          <!-- Days -->
          <span v-if="props.startDate!.diff(dayjs().toDate(), 'day') > 0"
            >{{ props.startDate?.diff(dayjs().toDate(), 'day') }} dias.</span
          >

          <!-- Hour -->
          <span
            v-else-if="
              props.startDate!.diff(dayjs().toDate(), 'hour') < 24 &&
              props.startDate!.diff(dayjs().toDate(), 'hour') > 0
            "
            >{{ props.startDate?.diff(dayjs().toDate(), 'hour') }} horas.</span
          >

          <!-- Minutes -->
          <span
            v-else-if="
              props.startDate!.diff(dayjs().toDate(), 'minute') < 60 &&
              props.startDate!.diff(dayjs().toDate(), 'minute') > 0
            "
            >{{
              props.startDate?.diff(dayjs().toDate(), 'minute')
            }}
            horas.</span
          >

          <!-- Second -->
          <span v-else
            >{{
              props.startDate?.diff(dayjs().toDate(), 'second')
            }}
            segundos.</span
          >
        </span>
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

  box-shadow: none;
}
</style>
