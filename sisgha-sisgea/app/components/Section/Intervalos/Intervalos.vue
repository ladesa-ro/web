<script setup lang="ts">
import { ref } from 'vue';
import IntervalosForm from './Form/Form.vue';
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

//
const isActive = ref(false);
const onClose = () => (isActive.value = false);
</script>

<template>
  <div class="container py-6 max-w-[70%] mx-auto p-10 justify-center items-center w-screen">
    <div class="top-section flex justify-between mx-6 min-w-0">
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
        <DialogModalEditOrCreateModal
          :form-component="IntervalosForm"
          @close="onClose"
        />
      </div>
    </div>

    <!-- listagem de intervalos -->
    <SectionIntervalosGrid />
  </div>
</template>
