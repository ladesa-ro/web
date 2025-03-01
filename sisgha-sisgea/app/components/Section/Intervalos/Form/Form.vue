<script setup lang="ts">
import Button from '@/components/UI/Button/Button.vue';
import Card from '@/components/UI/Card/CardInterval.vue';
import { ref } from 'vue';
// validacao de formulario
import { useForm } from 'vee-validate';
// importar api
import { useApiClient } from '~/composables';

const apiClient = useApiClient();

const emit = defineEmits(['close']);

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async () => {
  emit('close');
});

const fecharModal = () => {
  emit('close');
};


// Lista de intervalos fictícia
const intervalos = ref([
  { id: 1, inicio: '08:00', termino: '08:15' },
  { id: 2, inicio: '10:00', termino: '10:15' },
  { id: 3, inicio: '15:00', termino: '15:15' },
]);

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
</script>

<template>

  <!-- listagem de intervalos -->
  <div class="p-6 space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Card
        v-for="intervalo in intervalos"
        :key="intervalo.id"
        variant="block"
        :onEdit="() => abrirEdicao(intervalo)"
      >
        <div
          class="p-2"
          style="
            font-size: 11px;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 10px;
          "
        >
          <p class="font-semibold">Início: {{ intervalo.inicio }}</p>
          <DialogTrigger as-child>
            <div
              @click="abrirEdicao(intervalo)"
              class="flex justify-self-end text-ldsa-text-default"
              style="width: 1rem; height: 1rem;"
            >
              <img src="@/assets/icons/Editar.svg" alt="" />
            </div>
          </DialogTrigger>
          <p class="font-semibold">Término: {{ intervalo.termino }}</p>

          <DialogRoot>
            <DialogContent
              v-if="
                intervaloSelecionado && intervaloSelecionado.id === intervalo.id
              "
            >
              <DialogTitle>Editar Intervalo</DialogTitle>
              <div class="space-y-2">
                <label class="block text-sm font-medium">Início</label>
                <input
                  v-model="intervaloSelecionado.inicio"
                  type="time"
                  class="w-full border p-2 rounded-lg"
                />

                <label class="block text-sm font-medium">Término</label>
                <input
                  v-model="intervaloSelecionado.termino"
                  type="time"
                  class="w-full border p-2 rounded-lg"
                />

                <Button class="mt-2 w-full">Salvar</Button>
              </div>
            </DialogContent>
          </DialogRoot>
        </div>
      </Card>
    </div>
  </div>
</template>
