<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

import CardLink from '@/components/Section/Inicio/Cards/CardLink.vue';
import Section from '@/components/Section/Inicio/Layout/Section.vue';


import { IconsIconClockView, IconsIconClockGenerate, IconsIconReport } from '#components'; 
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="mx-auto max-w-[80%] p-10">
      
      <div class="container-header">
        <h1 class="main-title font-semibold pb-5 text-[20px]">
          Início - Acesso Rápido
        </h1>
        <hr class="divider flex-grow pt-5 border-t border-ldsa-grey" />
      </div>

      <div class="content">
       
        <Section title="Horário Acadêmico">
          <NuxtLink to="/sisgha/dape">
            <CardLink :icon="IconsIconClockView" title="Visualizar Horário" class="text-ldsa-text-green" />
          </NuxtLink>          
          <CardLink :icon="IconsIconClockGenerate" title="Gerar Horário" class="text-ldsa-text-green" />
        </Section>


        <Section title="Relatórios">
          <CardLink :icon="IconsIconReport" title="Aulas Ministradas" class="text-ldsa-text-green" />
        </Section>

        <Section title="Diários">
          <NuxtLink to="/sisgha/dape/diarios">
            <CardLink :icon="IconsIconReport" title="Diários" class="text-ldsa-text-green" />
          </NuxtLink>
        </Section>

      </div>

    </div>
  </div>
</template>

<style scoped>
.main-title::before {
  content: "";
  border: 2px solid #1bba47;
  margin-right: 0.5rem;
}
</style>