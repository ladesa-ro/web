<script lang="ts" setup>
import type { HorarioEdicaoDiferencaEntradaOutputRestDto } from '@ladesa-ro/web.api.client';
import { descreverEntrada } from './-Helpers/describeMudanca';

const props = defineProps<{
  entrada: HorarioEdicaoDiferencaEntradaOutputRestDto;
  modo: 'entram' | 'saem' | 'mudam';
  sessaoId: string;
}>();

const emit = defineEmits<{ desfeito: [] }>();

const campos = computed(() => {
  const todos = descreverEntrada(props.entrada);

  if (props.modo !== 'mudam') return todos;

  const alterados = todos.filter(campo => campo.antes !== campo.depois);
  return alterados.length > 0 ? alterados : todos;
});

const horarioEdicao = useHorarioEdicao();
const { error: toastError } = useToast();
const desfazendo = ref(false);

async function handleDesfazer() {
  desfazendo.value = true;
  try {
    await horarioEdicao.desfazerMudanca(props.sessaoId, props.entrada.mudancaId);
    emit('desfeito');
  } catch {
    toastError({ title: 'Não foi possível desfazer esta mudança' });
  } finally {
    desfazendo.value = false;
  }
}
</script>

<template>
  <li
    class="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-ldsa-grey/30 bg-ldsa-bg"
  >
    <div class="flex flex-wrap gap-x-4 gap-y-1">
      <span
        v-for="campo in campos"
        :key="campo.chave"
        class="text-sm text-ldsa-text-default"
      >
        <span class="font-medium">{{ campo.rotulo }}:</span>

        <template v-if="modo === 'mudam'">
          <span class="text-ldsa-grey line-through">{{ campo.antes }}</span>
          →
          <span>{{ campo.depois }}</span>
        </template>

        <template v-else>
          {{ modo === 'saem' ? campo.antes : campo.depois }}
        </template>
      </span>
    </div>

    <button
      type="button"
      class="text-sm font-medium text-ldsa-red hover:underline shrink-0 disabled:opacity-50"
      :disabled="desfazendo"
      @click="handleDesfazer"
    >
      Desfazer
    </button>
  </li>
</template>
