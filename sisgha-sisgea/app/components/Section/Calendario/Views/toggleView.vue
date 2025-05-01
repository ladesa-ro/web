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
  await toggleView(calendarView.value);
});
</script>

<template>
  <section class="flex w-full">
    <!-- View partial calendar-->
    <button
      :class="{ 'selected border-r-2': !calendarView }"
      class="toggle-button border-2 rounded-l-lg border-r-0"
      @click="toggleView(false)"
    >
      Calendário parcial
      <IconsCalendarIconPartialCalendar class="icon" />
    </button>

    <!-- View complete calendar -->
    <button
      :class="{ 'selected border-l-2': calendarView }"
      class="toggle-button border-2 rounded-r-lg border-l-0"
      @click="toggleView(true)"
    >
      Calendário completo
      <IconsCalendarIconCompleteCalendar class="icon" />
    </button>
  </section>
</template>

<style>
@reference "~/assets/styles/app-reference.css";

.toggle-button {
  @apply flex w-full gap-2 items-center justify-center border-ldsa-grey p-3 text-ldsa-grey;
  @apply text-sm sm:text-base font-semibold;
}

.selected {
  @apply bg-ldsa-green-1/10 border-ldsa-green-1 text-ldsa-text-green;
}

.icon {
  @apply w-[1.125rem] sm:w-5;
}
</style>
