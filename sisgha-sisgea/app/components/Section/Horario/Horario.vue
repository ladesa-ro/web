<script lang="ts" setup>
const selectedOption = ref<'dia' | 'semana'>('dia');
</script>

<template>
  <UIContainer class="flex flex-col gap-6 lg:gap-12">
    <!-- Cabeçalho -->
    <SectionHorarioHeaderSchedule
      class="w-full"
      v-model:toggle-option="selectedOption"
    />

    <!-- Opção "Horário da semana" -->
    <section
      v-show="selectedOption === 'semana'"
      class="flex flex-col min-[1400px]:items-center justify-center gap-10"
    >
      <SectionHorarioGeral class="overflow-auto" />

      <!-- Botão "Gerar PDF" -->
      <UIButtonDefault class="mx-auto min-h-14 max-w-40"> Gerar PDF </UIButtonDefault>
    </section>

    <!-- Opção "Horário do dia" -->
    <SectionHorarioDailyViewDaysAndLessons v-show="selectedOption === 'dia'" />
  </UIContainer>
</template>
