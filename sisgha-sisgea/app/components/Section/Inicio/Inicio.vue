<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { IconsIconClock } from '#components';
</script>

<template>
  <v-container>
    <div class="container mx-auto max-w-[80%] p-10">
      <div class="container-header">
        <h1 class="main-title font-semibold pb-5 text-[20px]">
          Início - Acesso Rápido
        </h1>
        <hr class="divider flex-grow pt-5 border-t border-[rgba(159,159,159,0.5)]" />
      </div>
      <div class="content">
        <div class="horario-academico mb-5">
          <h2 class="font-medium mb-3 text-[18px]">Horário Acadêmico</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-green-50 border border-[color:#2F9E41] rounded-md p-6 flex flex-col items-center max-w-xs">
              <IconsIconClockView class="w-16 h-16 mb-4" />
              <span class="text-green-600 text-[15px] font-bold">Visualizar Horário</span>
            </div>
            <div class="bg-green-50 border border-[color:#2F9E41] rounded-md p-6 flex flex-col items-center max-w-xs">
              <IconsIconClockGenerate class="w-16 h-16 mb-4" />
              <span class="text-green-600 text-[15px] font-bold">Gerar Horário</span>
            </div>
          </div>
        </div>
        <hr class="divider flex-grow pt-5 border-t border-[rgba(159,159,159,0.5)]" />
        <div class="relatorios mb-5">
          <h2 class="font-medium mb-3 text-[18px]">Relatórios</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-green-50 border border-[color:#2F9E41] rounded-md p-6 flex flex-col items-center max-w-xs">
              <IconsIconReport class="w-16 h-16 mb-4" />
              <span class="text-green-600 text-[15px] font-bold">Aulas Ministradas</span>
            </div>
          </div>
        </div>
        <hr class="divider flex-grow pt-5 border-t border-[rgba(159,159,159,0.5)]" />
        <div class="diarios">
          <h2 class="font-medium mb-3 text-[18px]">Diários</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 text-[15px] s-2 gap-4">
            <div class="bg-green-50 border border-[color:#2F9E41] rounded-md p-6 flex flex-col items-center max-w-xs">
              <IconsIconReport class="w-16 h-16 mb-4" />
              <span class="text-green-600 font-bold">Diários</span>
            </div>
          </div>
        </div>
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

.max-w-xs{
  max-width: 19rem;
}
</style>