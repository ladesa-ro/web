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
  <div class="w-2/3">
    <div
      class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4 w-full mb-9 mt-5"
    >
      <VVAutocomplete
        v-model="fusoHorarioSelecionado"
        :items="fusoHorario"
        class="w-full xl:col-span-3"
        label="Fuso Horário"
        name="fusoHorario.id"
        placeholder="Selecione um fuso horário"
      />
      <VVAutocomplete
        v-model="ordemSelecionada"
        :items="ordem"
        class="w-full xl:col-span-2"
        label="Ordem"
        name="ordem.id"
        placeholder="Selecione uma ordem"
      />
    </div>
  </div>
</template>
