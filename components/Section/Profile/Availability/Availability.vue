<script setup>
const selectedOptions = ref();

const options = [
  { value: 'Domingo' },
  { value: 'Segunda' },
  { value: 'Terça' },
  { value: 'Quarta' },
  { value: 'Quinta' },
  { value: 'Sexta' },
  { value: 'Sábado' },
];

selectedOptions.value = options[1];

let currentDayIndex = ref(1);

const changeDay = (delta) => {
  currentDayIndex.value =
    (currentDayIndex.value + delta + options.length) % options.length;

  selectedOptions.value = options[currentDayIndex.value];
};
</script>
<template>
  <SectionProfileCard class="pb-[20px]">
    <template #icone>
      <LogoSisghaLogo class="flex w-[22px] h-[22px]" />
    </template>

    <template #titulo>Disponibilidade</template>

    <div class="border-card mx-[20px] pb-[20px] min-h-[300px] flex flex-col">
      <div class="hours-availability flex-1 flex flex-col">
        <div class="top-availability">
          <IconsArrowIconArrow
            class="cursor-pointer text-white -icons"
            @click="changeDay(-1)"
          />

          <div>
            <span class="font-medium">
              {{ selectedOptions?.value }}
            </span>
          </div>

          <IconsArrowIconArrow
            class="rotate-180 cursor-pointer text-white -icons"
            @click="changeDay(1)"
          />
        </div>

        <div
          class="hours flex-1 flex-col sm:flex-row items-center justify-center overflow-x-auto whitespace-nowrap"
        >
          <div>
            <h5>Matutino</h5>
            <span class="element"></span>
            <ul class="list-hours">
              <li class="hour">08:00 - 09:00</li>
              <li class="hour">08:00 - 09:00</li>
              <li class="hour">08:00 - 09:00</li>
              <li class="hour">08:00 - 09:00</li>
            </ul>
          </div>
          <div>
            <h5 style="padding-left: 15%">Vespertino</h5>
            <span class="element"></span>
            <ul class="list-hours">
              <li class="hour">08:00 - 09:00</li>
              <li class="hour">08:00 - 09:00</li>
              <li class="hour">08:00 - 09:00</li>
              <li class="hour">08:00 - 09:00</li>
            </ul>
          </div>
          <div>
            <h5>Nortuno</h5>
            <span class="element"></span>
            <ul class="list-hours sm-text-wrap">
              <li class="hour">08:00 - 09:00</li>
              <li class="hour">08:00 - 09:00</li>
              <li class="hour">08:00 - 09:00</li>
              <li class="hour">08:00 - 09:00</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </SectionProfileCard>
</template>

<style>
.top-availability {
  display: flex;
  background-color: #278935;

  justify-content: center;
  align-items: center;
  height: 35px;
  gap: 40px;
  color: #fff;
  justify-content: space-between;
}

.-icons {
  margin-left: 10%;
  margin-right: 10%;
}

.hours {
  display: flex;
  gap: 18px;

  margin: 12px 22px;
}

.hours h5 {
  padding-left: 20%;
  padding-bottom: 10px;
  border-bottom: 2px solid #9ab69e;
}

.list-hours {
  font-weight: 500;
  margin-top: 10px;
  list-style: none;
}

.hour {
  display: flex;
  margin-top: 2px;
  text-wrap: nowrap;
}
</style>
