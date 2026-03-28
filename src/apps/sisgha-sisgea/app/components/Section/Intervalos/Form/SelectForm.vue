<script setup lang="ts">
const props = defineProps<{
  fusoHorario: string[];
  ordem: string[];
}>();

const emit = defineEmits([
  'update:fusoHorarioSelecionado',
  'update:ordemSelecionada',
]);

const fusoHorarioSelecionado = ref<string | null>(null);
const ordemSelecionada = ref<string | null>(null);

watch(fusoHorarioSelecionado, val =>
  emit('update:fusoHorarioSelecionado', val)
);
watch(ordemSelecionada, val => emit('update:ordemSelecionada', val));
</script>

<template>
  <div class="flex max-sm:flex-col gap-4 max-md:w-full">
    <VVAutocomplete
      v-model="ordemSelecionada"
      :items="ordem"
      class="w-full sm:w-40"
      label="Ordem"
      name="ordem.id"
      placeholder="Selecione"
    />
    <VVAutocomplete
      v-model="fusoHorarioSelecionado"
      :items="fusoHorario"
      class="w-full sm:min-w-64"
      label="Fuso Horário"
      name="fusoHorario.id"
      placeholder="Selecione um fuso horário"
    />
  </div>
</template>
