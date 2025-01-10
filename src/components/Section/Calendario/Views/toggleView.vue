<script lang="ts" setup>
const calendarView = ref<boolean>(false);

type Emits = {
  // Option selected
  (e: 'view:calendar', v: boolean): void;
};

const emitOptionSelected = defineEmits<Emits>();

const callingEmit = (v: boolean) => {
  if (v !== null) emitOptionSelected('view:calendar', v);
};

// Toggle calendar view
async function toggleView(v: boolean): Promise<void> {
  try {
    calendarView.value! = v!;
    callingEmit(calendarView.value);
  } catch (error) {
    alert('Não foi possível alterar a visualização.');
  }
}

onMounted(async () => {
  // Calling functions
  await toggleView(calendarView.value);
});
</script>

<template>
  <div>
    <section class="flex w-full cursor-pointer">
      <!-- View partial calendar-->
      <div
        class="flex w-full gap-2 items-center justify-center border-2 border-r-0 border-ldsa-grey p-3 font-[600] rounded-l-lg text-ldsa-grey"
        :class="{ '-selected border-r-2': calendarView === false }"
        @click="toggleView(false)"
      >
        <span class="text-sm sm:text-[16px] font-semibold w-[120px] lg:w-max">
          Calendário parcial
        </span>
        <IconsCalendarIconPartialCalendar class="w-[18px] sm:w-5" />
      </div>

      <!-- View complete calendar -->
      <div
        class="flex w-full gap-2 items-center justify-center border-2 border-l-0 border-ldsa-grey p-3 font-[600] rounded-r-lg text-ldsa-grey"
        :class="{ '-selected border-l-2': calendarView !== false }"
        @click="toggleView(true)"
      >
        <span class="text-sm sm:text-[16px] font-semibold w-[120px] lg:w-max">
          Calendário completo
        </span>
        <IconsCalendarIconCompleteCalendar class="w-[18px] sm:w-5" />
      </div>
    </section>
  </div>
</template>

<style>
.-selected {
  @apply border-ldsa-green-1;
  @apply bg-ldsa-green-1/20 text-ldsa-text-green;
}
</style>
