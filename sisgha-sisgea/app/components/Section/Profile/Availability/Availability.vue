<script setup>
import SisghaLogo from '~/components/Logo/Sisgha/Logo.vue';
import dayPeriods from './dayPeriods';

const options = [
  { value: 'Segunda' },
  { value: 'Terça' },
  { value: 'Quarta' },
  { value: 'Quinta' },
  { value: 'Sexta' },
  { value: 'Sábado' },
];

const selectedOptions = ref();
selectedOptions.value = options[0];

const currentDayIndex = ref(0);

const changeDay = delta => {
  currentDayIndex.value =
    (currentDayIndex.value + delta + options.length) % options.length;

  selectedOptions.value = options[currentDayIndex.value];
};
</script>

<template>
  <SectionProfileSectionsLayout :icon="SisghaLogo" title="Disponibilidade">
    <!-- hours card -->
    <div class="border-card">
      <section class="day-week-navigator">
        <IconsArrowIconArrow class="arrow" @click="changeDay(-1)" />

        <span class="font-medium">
          {{ selectedOptions?.value }}
        </span>

        <IconsArrowIconArrow class="arrow rotate-180" @click="changeDay(1)" />
      </section>

      <!-- card content with day periods -->
      <section class="flex flex-row gap-5 p-7">
        <div v-for="(period, periodName) in dayPeriods">
          <SectionProfileAvailabilityDayPeriod
            :period="period"
            :period-name="periodName"
          />
        </div>
      </section>
    </div>
  </SectionProfileSectionsLayout>
</template>

<style>
@reference "~/assets/styles/app.css";

.day-week-navigator {
  @apply flex justify-between items-center gap-10;
  @apply h-9 px-5;
  @apply bg-ldsa-green-1 text-ldsa-white;
}

.arrow {
  @apply text-ldsa-white cursor-pointer;
}
</style>
