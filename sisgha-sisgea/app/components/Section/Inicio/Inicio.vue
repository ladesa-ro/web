<script lang="ts" setup>
import CardLink from '@/components/Section/Inicio/CardLink/CardLink.vue';
import Section from '@/components/Section/Inicio/Section/Section.vue';

import {
  IconsIconClockGenerate,
  IconsIconClockView,
  IconsIconTeacherLesson,
} from '#components';

const DAPE_PATH = '/sisgha/dape';
</script>

<template>
  <UIContainer class="flex flex-col">
    <h1
      class="flex font-semibold text-xl mb-7 before:content-[''] before:border-[0.219rem] before:border-ldsa-green-1 before:mr-3"
    >
      Início - Acesso Rápido
    </h1>

    <Section title="Horário Acadêmico">
      <CardLink
        :to="`${DAPE_PATH}/horario`"
        :icon="IconsIconClockView"
        title="Visualizar Horário"
      />

      <CardLink
        :to="`${DAPE_PATH}/horario`"
        :icon="IconsIconClockGenerate"
        title="Gerar Horário"
      />
    </Section>

    <Section title="Relatórios">
      <CardLink
        :to="`${DAPE_PATH}/relatorios/aulas-ministradas`"
        :icon="IconsIconTeacherLesson"
        title="Aulas Ministradas"
      />
    </Section>

    <Section title="Diários">
      <CardLink
        :to="`${DAPE_PATH}/diarios`"
        :icon="IconsIconTeacherLesson"
        title="Diários"
      />
    </Section>
  </UIContainer>
</template>
