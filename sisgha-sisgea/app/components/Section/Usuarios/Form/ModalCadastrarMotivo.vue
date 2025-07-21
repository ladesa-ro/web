<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
  horariosSemMotivo: string[];
}>();

const emit = defineEmits(['fechar', 'cadastrar']);

const horarioSelecionado = ref(props.horariosSemMotivo[0] || '');
const motivoText = ref('');

// Atualiza horário selecionado se prop mudar (ex: quando o modal é reaberto)
watch(
  () => props.horariosSemMotivo,
  (val) => {
    if (val.length > 0) horarioSelecionado.value = val[0];
  }
);

function onSubmit() {
  if (!horarioSelecionado.value) return alert('Selecione um horário');
  if (!motivoText.value.trim()) return alert('Informe o motivo');

  emit('cadastrar', horarioSelecionado.value, motivoText.value.trim());
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    @click.self="emit('fechar')"
  >
    <div class="bg-white p-6 rounded shadow-lg max-w-sm w-full">
      <h2 class="text-lg font-bold mb-4">Cadastrar Motivo de Indisponibilidade</h2>

      <label class="block mb-2 font-semibold">Horário:</label>
      <select v-model="horarioSelecionado" class="w-full mb-4 p-2 border rounded">
        <option
          v-for="horario in props.horariosSemMotivo"
          :key="horario"
          :value="horario"
        >
          {{ horario }}
        </option>
      </select>

      <label class="block mb-2 font-semibold">Motivo:</label>
      <textarea
        v-model="motivoText"
        rows="3"
        placeholder="Informe o motivo aqui"
        class="w-full p-2 border rounded"
      />

      <div class="mt-4 flex justify-end gap-2">
        <button
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          @click="emit('fechar')"
          type="button"
        >
          Cancelar
        </button>

        <button
          class="px-4 py-2 bg-ldsa-green-1 text-white rounded hover:bg-ldsa-green-2"
          @click="onSubmit"
          type="button"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>
