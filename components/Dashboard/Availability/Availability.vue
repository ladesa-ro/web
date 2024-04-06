<script setup>
import IconBefore from "@/components/Icons/IconBefore.vue";

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
<template>
  <div>
    <v-container class="container-availability ma-0 pa-0 w-auto">
      <div class="hours-availability">
        <div class="top-availability">
          <div class="icons">
            <IconBefore @click="changeDay(-1)" />
          </div>

          <div>
            <span>{{ selectedOptions[0]?.value }}</span>
          </div>

          <div class="icons">
            <IconsIconAfter class="icon-after" @click="changeDay(1)" />
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style>
.container-availability {
  height: 300px;
  border: 2px solid #9ab69e;
  border-radius: 8px;
}

.top-availability {
  display: flex;
  background-color: #278935;
  border-radius: 8px 8px 0px 0px;
  justify-content: center;
  align-items: center;
  height: 35px;
  gap: 40px;
  color: #fff;
  justify-content: space-between;
}

.icons {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
