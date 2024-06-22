<script lang="ts" setup>
let calendarView = ref<boolean>(false);

const emitOptionSelected = defineEmits<{
  // Option selected
  (e: 'view:calendar', v: boolean): void;
}>();

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
    <section class="flex cursor-pointer">
      <!-- View partial calendar-->
      <div
        class="flex gap-2 items-center border-2 border-r-0 border-[#9AB69E] p-3 font-[600] rounded-l-lg text-[#9AB69E]"
        :class="{ '-selected border-r-2': calendarView === false }"
        @click="toggleView(false)"
      >
        <span>Calendário parcial</span>
        <IconsCalendarIconPartialCalendar class="w-5" />
      </div>

      <!-- View complete calendar -->
      <div
        class="flex gap-2 items-center border-2 border-l-0 border-[#9AB69E] p-3 font-[600] rounded-r-lg text-[#9AB69E]"
        :class="{ '-selected border-l-2': calendarView !== false }"
        @click="toggleView(true)"
      >
        <span>Calendário completo</span>
        <IconsCalendarIconCompleteCalendar class="w-5" />
      </div>
    </section>
  </div>
</template>

<style>
.-selected {
  border-color: #118d3b;
  background-color: #ebf8ef;
  color: #118d3b;
}
</style>
