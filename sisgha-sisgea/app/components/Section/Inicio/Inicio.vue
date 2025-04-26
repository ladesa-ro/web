<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

import CardLink from '@/components/Section/Inicio/Cards/CardLink.vue';
import Section from '@/components/Section/Inicio/Layout/Section.vue';


import { IconsIconClockView, IconsIconClockGenerate, IconsIconReport } from '#components'; 
</script>

<template>
  <v-container>
    <div class="mx-auto max-w-[80%] p-10">
      
      <div class="container-header">
        <h1 class="main-title font-semibold pb-5 text-[20px]">
          Início - Acesso Rápido
        </h1>
        <hr class="divider flex-grow pt-5 border-t border-ldsa-grey" />
      </div>

      <div class="content">

        <Section title="Horário Acadêmico">
          <CardLink :icon="IconsIconClockView" title="Visualizar Horário" />
          <CardLink :icon="IconsIconClockGenerate" title="Gerar Horário" />
        </Section>

        <Section title="Relatórios">
          <CardLink :icon="IconsIconReport" title="Aulas Ministradas" />
        </Section>

        <Section title="Diários">
          <CardLink :icon="IconsIconReport" title="Diários" />
        </Section>

      </div>

    </div>
  </v-container>
</template>

<style scoped>
.main-title::before {
  content: "";
  border: 2px solid #1bba47;
  margin-right: 0.5rem;
}
</style>