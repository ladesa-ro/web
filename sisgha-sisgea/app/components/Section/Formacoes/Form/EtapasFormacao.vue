<script setup lang="ts">
defineProps<{ periodNumber: number }>();

const etapas = reactive([
  {
    id: 0,
    cor: '#000',
    nome: '',
  },
]);

const addEtapa = () => {
  etapas.push({
    id: etapas[etapas.length - 1]!.id + 1 || 1,
    cor: '#000',
    nome: '',
  });
};

const removeEtapa = (index: number) => {
  etapas.splice(index, 1);
};
</script>

<template>
  <div class="flex items-center gap-2.5">
    <h1 class="font-medium">Período {{ periodNumber }}</h1>
    <div class="h-1 flex-1 bg-ldsa-grey" />
  </div>

  <form class="flex flex-col gap-5">
    <div
      v-for="(etapa, index) in etapas"
      :key="etapa.id"
      class="flex gap-2.5 items-center"
    >
      <!-- TODO: definir cores especificas para selecao -->
      <VVTextField type="color" name="cor" />

      <VVTextField
        name="nome"
        placeholder="Digite aqui"
        label="Nome da etapa"
      />

      <button
        v-if="index > 0"
        @click="removeEtapa(index)"
        class="shrink-0 flex justify-center text-ldsa-red h-12 w-7 hover:bg-ldsa-red/10 rounded-sm"
        aria-label="Remover etapa"
        type="button"
      >
        <IconsExclude class="w-5" />
      </button>
    </div>

    <button
      class="border-2 border-ldsa-grey border-dashed rounded-lg py-3.5 flex items-center gap-1.5"
      @click="addEtapa()"
    >
      Adicionar etapa
      <IconsAdd />
    </button>
  </form>
</template>
