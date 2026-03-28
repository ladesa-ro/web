<script setup lang="ts">
import PeriodosGrid from '~/components/Section/Intervalos/Layout/Grid.vue';
import {
  agruparPorPeriodo,
  achatarPeriodos,
  validarIntervalos,
  toApiFormat,
  toDisplayFormat,
} from '~/utils/horarios';
import type { PeriodoGroup } from '~/utils/horarios';

const campusContext = useCampusContext();
const { findAtual, replace, invalidate } = useHorariosDeAula();
const toast = useToast();

const { data: queryData, isLoading, isError } = findAtual(campusContext);

const periodos = computed<PeriodoGroup[]>(() => {
  const items = (queryData.value?.data ?? []).map(i => ({
    inicio: toDisplayFormat(i.inicio),
    fim: toDisplayFormat(i.fim),
  }));
  return agruparPorPeriodo(items);
});

const isEditing = ref(false);
const isSaving = ref(false);
const editingPeriodos = ref<PeriodoGroup[]>([]);
const validationErrors = ref<string[]>([]);

const novosIntervalos = ref<({ inicio: string; fim: string } | null)[]>([null, null, null]);

const intervaloEditando = ref<{
  periodoIndex: number;
  intervaloIndex: number;
  dados: { inicio: string; fim: string };
} | null>(null);

const displayPeriodos = computed(() =>
  isEditing.value ? editingPeriodos.value : periodos.value
);

function entrarEdicao() {
  editingPeriodos.value = JSON.parse(JSON.stringify(periodos.value));
  novosIntervalos.value = editingPeriodos.value.map(() => null);
  intervaloEditando.value = null;
  validationErrors.value = [];
  isEditing.value = true;
}

function cancelarEdicao() {
  isEditing.value = false;
  editingPeriodos.value = [];
  novosIntervalos.value = [null, null, null];
  intervaloEditando.value = null;
  validationErrors.value = [];
}

async function salvar() {
  const todosIntervalos = achatarPeriodos(editingPeriodos.value);
  const { valid, errors } = validarIntervalos(todosIntervalos);

  if (!valid) {
    validationErrors.value = errors;
    return;
  }

  validationErrors.value = [];
  const campus = campusContext.value;
  if (!campus) {
    toast.error({ title: 'Nenhum campus selecionado.' });
    return;
  }

  isSaving.value = true;
  try {
    const horarios = todosIntervalos.map(i => ({
      inicio: toApiFormat(i.inicio),
      fim: toApiFormat(i.fim),
    }));
    await replace(campus, horarios);
    await invalidate();
    isEditing.value = false;
    editingPeriodos.value = [];
    novosIntervalos.value = [null, null, null];
    intervaloEditando.value = null;
    toast.success({ title: 'Horários atualizados com sucesso!' });
  } catch {
    toast.error({ title: 'Erro ao salvar horários.' });
  } finally {
    isSaving.value = false;
  }
}

function confirmarIntervalo(index: number) {
  const intervalo = novosIntervalos.value[index];
  const periodo = editingPeriodos.value[index];
  if (!intervalo || !periodo) return;

  if (intervalo.inicio && intervalo.fim) {
    periodo.intervalos.push({ ...intervalo });
    novosIntervalos.value[index] = null;
  }
}

function removerIntervalo(i: number, j: number) {
  const periodo = editingPeriodos.value[i];
  if (!periodo) return;
  periodo.intervalos.splice(j, 1);
}

function adicionarIntervalo(index: number) {
  const algumAberto = novosIntervalos.value.some(
    (intervalo, idx) => intervalo !== null && idx !== index
  );

  if (algumAberto) {
    novosIntervalos.value = novosIntervalos.value.map(() => null);
  }

  if (novosIntervalos.value[index] == null) {
    novosIntervalos.value[index] = { inicio: '', fim: '' };
  }
}

function atualizarNovoIntervalo(
  index: number,
  val: { inicio: string; fim: string } | null
) {
  novosIntervalos.value[index] = val;
}

function editarIntervalo(i: number, j: number) {
  if (intervaloEditando.value !== null) return;
  const periodo = editingPeriodos.value[i];
  const intervalo = periodo?.intervalos?.[j];
  if (!intervalo) return;
  intervaloEditando.value = {
    periodoIndex: i,
    intervaloIndex: j,
    dados: { ...intervalo },
  };
}

function cancelarEdicaoIntervalo() {
  intervaloEditando.value = null;
}

function atualizarEdicao(val: { inicio: string; fim: string }) {
  if (!intervaloEditando.value) return;
  intervaloEditando.value.dados = val;
}

function confirmarEdicao() {
  const edit = intervaloEditando.value;
  if (!edit) return;

  const periodo = editingPeriodos.value[edit.periodoIndex];
  if (!periodo?.intervalos?.[edit.intervaloIndex]) return;

  periodo.intervalos[edit.intervaloIndex] = { ...edit.dados };
  intervaloEditando.value = null;
}
</script>

<template>
  <UIContainer variant="larger" class="flex flex-col gap-6">
    <nav
      class="flex max-md:flex-col items-start gap-3.5 md:justify-between md:items-center"
    >
      <UITitleWithGoBack to="../" text="Horários de aula" />

      <div class="flex gap-4 items-center">
        <template v-if="!isEditing">
          <button
            @click="entrarEdicao"
            :disabled="isLoading || !campusContext"
            class="px-4 py-2 bg-ldsa-green-1 text-white rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Editar
          </button>
        </template>
        <template v-else>
          <button
            @click="salvar"
            :disabled="isSaving"
            class="px-4 py-2 bg-ldsa-green-1 text-white rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {{ isSaving ? 'Salvando...' : 'Salvar' }}
          </button>
          <button
            @click="cancelarEdicao"
            :disabled="isSaving"
            class="px-4 py-2 border border-ldsa-grey text-ldsa-grey rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        </template>
      </div>
    </nav>

    <div
      v-if="validationErrors.length > 0"
      class="bg-red-50 border border-ldsa-red rounded-md p-3"
    >
      <p
        v-for="(error, i) in validationErrors"
        :key="i"
        class="text-ldsa-red text-sm"
      >
        {{ error }}
      </p>
    </div>

    <div v-if="isLoading" class="text-center py-12 text-ldsa-grey">
      Carregando horários...
    </div>

    <div
      v-else-if="isError"
      class="text-center py-12 text-ldsa-red"
    >
      Erro ao carregar horários.
    </div>

    <div
      v-else-if="!campusContext"
      class="text-center py-12 text-ldsa-grey"
    >
      Selecione um campus para visualizar os horários.
    </div>

    <PeriodosGrid
      v-else
      :periodos="displayPeriodos"
      :is-editing="isEditing"
      :novos-intervalos="novosIntervalos"
      :intervalo-editando="intervaloEditando"
      @confirmNovo="confirmarIntervalo"
      @removeIntervalo="removerIntervalo"
      @add="adicionarIntervalo"
      @updateNovoIntervalo="atualizarNovoIntervalo"
      @edit="editarIntervalo"
      @cancelEdit="cancelarEdicaoIntervalo"
      @updateEdit="atualizarEdicao"
      @confirmEdit="confirmarEdicao"
    />
  </UIContainer>
</template>
