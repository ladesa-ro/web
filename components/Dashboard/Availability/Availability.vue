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
  <v-container class="d-flex ma-0  pa-0 justify-space-between w-50 ">
    <h4>
    <IconsIconAvailbility class="icon"/>
      Disponibilidade</h4>
    <h4>
    <IconsIconTeaching class="icon"/>
      Ensino</h4>
  </v-container>

    <v-container class=" pa-0 d-flex">
      
      <div class=" container container-availability pa-0 mt-8 w-50 ">
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
      </div>
    
      <DashboardTeaching />
    </v-container>
</template>

<style>
.container {
  border: 2px solid red;
  border-radius: 8px;
  padding: 30px;
}
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
  margin-left: 10%;
  margin-right: 10%;
}

.icon {
  margin-right: 8px;
}



</style>
