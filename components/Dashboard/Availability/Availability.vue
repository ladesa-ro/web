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
    <div class="container-availability">
      <div class="hours-availability">
        <div class="top-availability">
          <div>
            <IconBefore @click="changeDay(-1)" />
          </div>

          <div>
            <span>{{ selectedOptions[0]?.value }}</span>
          </div>

          <div>
            <IconsIconAfter class="icon-after" @click="changeDay(1)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container-availability {
  height: 300px;
  width: 45%;
  margin-top: 40px;
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
}
</style>
