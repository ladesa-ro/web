<template>
  <div>
    <div class="initmodal2">
      <div class="iconWrapper">
        <div class="iconB">
          <IconBeforeDays  @click="changeDay(-1)" />
        </div>

        <div  class="dayOfWeek">
          <span>{{ selectedOptions[0]?.value }}</span>
        </div>

        <div class="iconA">
          <IconAfterDays  @click="changeDay(1)" />
        </div>
      </div>
    </div>
    <div class="contentModal">
      <div class="hoursMorning">
        <HoursMarkup />
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import IconAfterDays from "../Icons/IconAfterDays.vue";
import IconBeforeDays from "../Icons/IconBeforeDays.vue";
import HoursMarkup from "./HoursMarkup.vue";

const selectedOptions = ref([]);
const options = [
  { value: "Segunda" },
  { value: "Terça" },
  { value: "Quarta" },
  { value: "Quinta" },
  { value: "Sexta" },
  { value: "Sábado" },
  { value: "Domingo" },
];

let currentDayIndex = ref(0);

const changeDay = (delta) => {
  currentDayIndex.value =
    (currentDayIndex.value + delta + options.length) % options.length;
  selectedOptions.value = [options[currentDayIndex.value]];
};
</script>

<style>
.initmodal2,
.contentModal {
  display: flex;
  align-items: center;
}

.iconWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  margin-left: 60px;
}

.iconB,
.iconA {
  cursor: pointer;
}

.iconA {
  margin-left: 70px; 
}

.dayOfWeek {
  text-align: center;
  margin-left: 70px;
  width: 80px;
}
</style>
