<script lang="ts" setup>
import CardLink from '@/components/Section/Inicio/CardLink/CardLink.vue';
import Section from '@/components/Section/Inicio/Section/Section.vue';

import { IconsClockView, IconsTeacherLesson } from '#components';

const DAPE_PATH = '/sisgha/dape';
</script>

<template>
  <UIContainer class="flex flex-col">
    <UITitle text="Início - Acesso Rápido" />

    <Section title="Horário Acadêmico">
      <CardLink
        :to="`${DAPE_PATH}/horario`"
        :icon="IconsClockView"
        title="Visualizar Horário"
      />

      <SectionHorarioDapeGenerateModal mode="white" />
    </Section>

    <Section title="Relatórios">
      <CardLink
        :to="`${DAPE_PATH}/relatorios/aulasMinistradas`"
        :icon="IconsTeacherLesson"
        title="Aulas Ministradas"
      />
    </Section>

    <Section title="Diários">
      <CardLink
        :to="`${DAPE_PATH}/diarios`"
        :icon="IconsTeacherLesson"
        title="Diários"
      />
    </Section>
  </UIContainer>
</template>
