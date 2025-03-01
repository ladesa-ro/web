<script setup lang="ts">
import { ref } from 'vue';
// validacao de formulario
// importar api

const intervaloSelecionado = ref<{
  id: number;
  inicio: string;
  termino: string;
} | null>(null);

// Função para abrir o modal de edição
const abrirEdicao = (intervalo: {
  id: number;
  inicio: string;
  termino: string;
}) => {
  intervaloSelecionado.value = { ...intervalo };
};

const periodos = ['Todos', 'Matutino', 'Vespertino', 'Noturno'];
const ordem = ['Crescente', 'Decrescente'];
</script>

<template>
  <div class="container py-6 max-w-[89%] mx-auto p-10">
    <div class="flex justify-between w-screen mx-6">
      <!-- filtros -->
      <div class="filtros flex w-screen">
        <VVAutocomplete
          :items="periodos"
          class="xl:max-w-[200px] mr-4"
          label="Classificar"
          name="periodo.id"
        />

        <VVAutocomplete
          :items="ordem"
          class="xl:max-w-[200px]"
          label="Ordem"
          name="ordem.id"
        />
      </div>

      <div class="buttons">
        <!-- botão de excluir -->
        

        <!-- botão de adicionar intervalo -->
        <div class="flex items-center shrink-0">
          <SectionIntervalosModalsForm />
        </div>
      </div>
    </div>

    <!-- listagem de intervalos -->
    <SectionIntervalosGrid />
  </div>
</template>
