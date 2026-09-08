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
    await horarioEdicao.desfazerMudanca(
      props.sessaoId,
      props.entrada.mudancaId
    );
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
    class="mudanca-item u-flex u-flex-wrap u-items-center u-justify-between u-gap-3 u-p-3 u-rounded-lg"
  >
    <div class="mudanca-item__campos u-flex u-flex-wrap">
      <span
        v-for="campo in campos"
        :key="campo.chave"
        class="mudanca-item__campo u-text-sm"
      >
        <span class="u-font-medium">{{ campo.rotulo }}:</span>

        <template v-if="modo === 'mudam'">
          <span class="mudanca-item__antes">{{ campo.antes }}</span>
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
      class="mudanca-item__undo u-text-sm u-font-medium u-shrink-0"
      :disabled="desfazendo"
      @click="handleDesfazer"
    >
      Desfazer
    </button>
  </li>
</template>

<style scoped>
.mudanca-item {
  border: 1px solid rgb(from var(--ladesa-grey-color) R G B / 30%);
  background-color: var(--ladesa-background-color);
}

.mudanca-item__campos {
  column-gap: 1rem;
  row-gap: 0.25rem;
}

.mudanca-item__campo {
  color: var(--ladesa-text-default-color);
}

.mudanca-item__antes {
  color: var(--ladesa-grey-color);
  text-decoration: line-through;
}

.mudanca-item__undo {
  color: var(--ladesa-red-color);
}

.mudanca-item__undo:hover {
  text-decoration: underline;
}

.mudanca-item__undo:disabled {
  opacity: var(--ui-disabled-opacity);
}
</style>
