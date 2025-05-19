<script setup lang="ts">
defineProps<{
  fusoHorario: string[];
  ordem: string[];
}>();
</script>

<template>
  <div class="w-2/3">
    <div class="grid grid-cols-1 xl:grid-cols-5 gap-4 w-full m-auto mb-9">
      <VVAutocomplete
        :items="fusoHorario"
        class="w-full xl:col-span-3"
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
  </div>
</template>
