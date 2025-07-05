<script lang="ts" setup>
// Import
import { calendarData } from '../Functions/CalendarData.js';

// Props
type Props = {
  eventId: string;
  notifyStatus: boolean;
};

const props = defineProps<Props>();
const notify = ref<boolean>(props.notifyStatus);

async function enableNotify(isEnabled: boolean): Promise<void> {
  try {
    notify.value = !isEnabled;
    calendarData.notifyEvent(props.eventId, notify.value);
  } catch (error) {
    alert('Não foi possível ativar a notificação do evento.');
  }
}
</script>

<template>
  <!-- Enable notify-->
  <div
    :class="{ '-enable': notify === true }"
    class="flex cursor-pointer w-max gap-3 items-center justify-center border-2 border-ldsa-green-1 bg-ldsa-green-1 p-3 font-[600] rounded-lg text-ldsa-white"
    @click="enableNotify(notify)"
  >
    <span class="text-sm sm:text-[16px] font-semibold w-max lg:w-max">
      Me interessa
    </span>
    <IconsNotifications v-show="notify === false" class="w-[18px] sm:w-5" />
    <IconsConfirm v-show="notify === true" class="w-[18px] sm:w-5" />
  </div>
</template>

<style>
@reference "~/assets/styles/app.css";

.-enable {
  @apply border-ldsa-green-1 bg-ldsa-green-1/10 text-ldsa-text-green;
}
</style>
