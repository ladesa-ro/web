<script lang="ts" setup>
const selectedOption = ref<'dia' | 'semana'>('dia');
</script>

<template>
  <UIContainer
    class="flex flex-col gap-8 lg:gap-12"
    :class="{ 'items-center': selectedOption !== 'semana' }"
  >
    <!-- Cabeçalho -->
    <SectionHorarioProfessorEAlunoHeaderSchedule
      class="w-full max-w-screen-2xl mx-auto"
      v-model:toggle-option="selectedOption"
    />

    <!-- Opção "Horário da semana" -->
    <section
      v-show="selectedOption === 'semana'"
      class="flex flex-col min-[1400px]:items-center justify-center gap-10"
    >
      <SectionHorarioProfessorEAlunoGeral class="overflow-auto" />

      <!-- Botão "Gerar PDF" -->
      <UIButtonDefault class="mx-auto min-h-14 max-w-40">
        Gerar PDF
      </UIButtonDefault>
    </section>

    <!-- Opção "Horário do dia" -->
    <SectionHorarioProfessorEAlunoDailyViewDaysAndLessons v-show="selectedOption === 'dia'" />
  </UIContainer>
</template>
