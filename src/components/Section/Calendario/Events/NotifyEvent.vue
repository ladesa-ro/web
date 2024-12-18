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
    class="flex cursor-pointer w-max gap-3 items-center justify-center border-2 border-[#118D3B] bg-[#118D3B] p-3 font-[600] rounded-lg text-[#FFFFFF]"
    :class="{ '-enable': notify === true }"
    @click="enableNotify(notify)"
  >
    <span class="text-sm sm:text-[16px] font-semibold w-max lg:w-max">
      Me interessa
    </span>
    <IconsIconNotifications v-show="notify === false" class="w-[18px] sm:w-5" />
    <IconsIconConfirm v-show="notify === true" class="w-[18px] sm:w-5" />
  </div>
</template>

<style>
.-enable {
  border-color: #118d3b;
  background-color: #ebf8ef;
  color: #118d3b;
}
</style>
