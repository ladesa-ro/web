<script setup lang="ts">
import { ref } from 'vue';
import DeleteButton from '~/components/UI/ButtonModal/DeleteButton.vue';
import IntervalosFormAdd from './Form/FormAdd.vue';

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
  <div
    class="container py-6 max-w-[70%] mx-auto p-10 justify-center items-center w-screen"
  >
    <div class="top-section flex justify-between mx-6 min-w-0">
      <!-- filtros -->
      <div class="filtros flex w-screen">
        <VVAutocomplete
          :items="periodos"
          class="xl:max-w-[280px] mr-4"
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

      <div class="buttons flex gap-4">
        <!-- botão de excluir -->
        <DeleteButton
        class="min-h-12 mb-2"
        >
        </DeleteButton>

        <!-- botão de adicionar intervalo -->
        <DialogModalEditOrCreateModal
          :form-component="IntervalosFormAdd"
          @close="onClose"
        />
      </div>
    </div>

    <!-- listagem de intervalos -->
    <SectionIntervalosGrid />
  </div>
</template>
