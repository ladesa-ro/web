<script setup>
import dayPeriods from './dayPeriods';

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

const currentDayIndex = ref(1);

const changeDay = (delta) => {
  currentDayIndex.value =
    (currentDayIndex.value + delta + options.length) % options.length;

  selectedOptions.value = options[currentDayIndex.value];
};
</script>

<template>
  <SectionProfileCard>
    <template #icon>
      <LogoSisghaLogo />
    </template>

    <template #title>Disponibilidade</template>

    <!-- hours card -->
    <div class="border-card">
      <section class="card-header">
        <IconsArrowIconArrow
          class="cursor-pointer text-ldsa-white"
          @click="changeDay(-1)"
        />

        <div>
          <span class="font-medium">
            {{ selectedOptions?.value }}
          </span>
        </div>

        <IconsArrowIconArrow
          class="rotate-180 cursor-pointer text-ldsa-white"
          @click="changeDay(1)"
        />
      </section>

      <section class="card-content">
        <div v-for="(period, periodName) in dayPeriods">
          <SectionProfileAvailabilityDayPeriod
            :period="period"
            :period-name="periodName"
          />
        </div>
      </section>
    </div>
  </SectionProfileCard>
</template>

<style>
.card-header {
  @apply flex justify-between items-center gap-10;
  @apply h-9 px-5;
  @apply bg-ldsa-green-1 text-ldsa-white;
}

.card-content {
  @apply flex flex-row gap-5 p-7;
}
</style>
