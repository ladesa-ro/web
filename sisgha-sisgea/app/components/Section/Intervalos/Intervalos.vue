<script setup lang="ts">
import { ref } from 'vue';

const fusoHorario = ref([
  'Amazonas - Manaus (GMT-04:00)',
  'Fernando de Noronha (UTC-02:00)',
  'Acre (UTC-05:00)',
]);

const ordem = ref([
  'Crescente',
  'Decrescente'
]);

const form = ref({
  fusoHorario: null,
  ordem: null
});
</script>

<template>
  <div class="container">
    <div class="mx-auto max-w-[55%] p-10">
      <!-- seçao de selects -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full m-auto mb-6">
        <VVAutocomplete
          :items="fusoHorario"
          class="w-full xl:col-span-2"
          label="Fuso Horário"
          name="fusoHorario.id"
          placeholder="Selecione um fuso horário"
        />
        <VVAutocomplete
          :items="ordem"
          class="w-full xl:col-span-1"
          label="Ordem"
          name="ordem.id"
          placeholder="Selecione uma ordem"
        />
      </div>
      <!-- intervalos  -->
    </div>
  </div>
</template>
