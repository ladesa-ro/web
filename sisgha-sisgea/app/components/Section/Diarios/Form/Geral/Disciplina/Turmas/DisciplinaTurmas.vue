<script lang="ts" setup>
import { useLadesaApiCrudUsuarios } from '#imports';
import type { TurmaSelecionada } from '../../Contexto';
import { useContextDiariosFormGeral } from '../../Contexto';

const $emit = defineEmits(['close', 'add', 'back']);

const { disciplinaSelecionada, turmasSelecionadas } =
  useContextDiariosFormGeral();

const turmasAdicionadas = computed({
  get: () => turmasSelecionadas!.value ?? [],
  set: (val: TurmaSelecionada[]) => {
    turmasSelecionadas!.value = val;
  },
});

const adicionarTurmas = (novasTurmas: TurmaSelecionada[]) => {
  novasTurmas.forEach(t => {
    if (!turmasAdicionadas.value.some(existing => existing.id === t.id)) {
      turmasAdicionadas.value.push(t);
    }
  });
};

const removerTurma = (turmaId: string) => {
  turmasAdicionadas.value = turmasAdicionadas.value.filter(
    t => t.id !== turmaId
  );
};

const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

type AulaAgrupada = {
  id: number;
  dia: string;
  totalAulas: number;
};

const aulasAgrupadas = ref<AulaAgrupada[]>([
  { id: 1, dia: diasSemana[0] ?? 'Segunda', totalAulas: 1 },
]);

let proximoId = 2;

const adicionarDia = () => {
  const total = aulasAgrupadas.value.length;
  const novoDia = diasSemana[total % diasSemana.length] ?? 'Segunda';
  aulasAgrupadas.value.push({ id: proximoId++, dia: novoDia, totalAulas: 1 });
};

const removerDia = (id: number) => {
  aulasAgrupadas.value = aulasAgrupadas.value.filter(aula => aula.id !== id);
};

const incrementarAulas = (id: number) => {
  const aula = aulasAgrupadas.value.find(a => a.id === id);
  if (aula) aula.totalAulas++;
};

const decrementarAulas = (id: number) => {
  const aula = aulasAgrupadas.value.find(a => a.id === id);
  if (aula && aula.totalAulas > 1) aula.totalAulas--;
};

const professoresSelecionados = ref<string[]>([]);

type ProfessorItem = {
  value: string;
  label: string;
  foto?: string;
  cargo?: string;
};

const {
  composables: { useListQuery },
} = useLadesaApiCrudUsuarios();

const searchBarText = ref('');
const queries = computed(() => ({ search: searchBarText.value }));

const {
  data: { items: usuarios },
  methods: { suspend },
} = useListQuery(queries);

onMounted(async () => {
  await suspend();
});

const professores = computed<ProfessorItem[]>(() => {
  if (!usuarios.value) return [];
  return usuarios.value
    .map(u => ({
      value: u.id,
      label: u.nome,
      foto: u.foto,
      cargo: u.cargo,
    }))
    .toSorted((a, b) => a.label.localeCompare(b.label));
});

const professorSearch = ref('');
const professoresFiltrados = computed(() =>
  professores.value.filter(p =>
    p.label.toLowerCase().includes(professorSearch.value.toLowerCase())
  )
);

const showOptionsMap = ref<Record<string, boolean>>({});
const selectedOptionMap = ref<Record<string, 'aulas' | 'professores' | null>>(
  {}
);

const toggleOptions = (turmaId: string) => {
  showOptionsMap.value[turmaId] = !showOptionsMap.value[turmaId];

  if (selectedOptionMap.value[turmaId] === undefined) {
    selectedOptionMap.value[turmaId] = null;
  }
};

const selectOption = (turmaId: string, option: 'aulas' | 'professores') => {
  selectedOptionMap.value[turmaId] = option;
};

const closeForm = () => $emit('close');
const addForm = () => $emit('add');
const backForm = () => $emit('back');

defineExpose({
  adicionarTurmas,
});
</script>

<template>
  <form class="min-w-[28.125rem] text-ldsa-text-default" @submit.prevent>
    <DialogModalBaseLayout
      :on-close="closeForm"
      title="Gerenciamento de turmas da disciplina"
    >
      <!-- info disciplina -->
      <div class="border-2 border-ldsa-grey p-4 rounded-xl">
        <span class="font-semibold">{{
          disciplinaSelecionada?.nome
        }}</span>
        <p class="font-medium text-sm text-ldsa-grey">
          {{ disciplinaSelecionada?.cargaHoraria }}H
        </p>
      </div>

      <!-- card de turma -->
      <div
        v-for="turma in turmasAdicionadas"
        :key="turma.id"
        class="border-2 border-ldsa-grey p-4 rounded-xl mt-1"
      >
        <div
          class="flex items-center justify-between cursor-pointer"
          @click="toggleOptions(turma.id)"
        >
          <div>
            <span class="font-semibold text-sm">{{ turma.nome }}</span>
            <p class="font-medium text-sm text-ldsa-grey">
              {{ turma.turno }}
            </p>
          </div>

          <div class="flex items-center">
            <IconsExclude
              class="w-7 p-1 text-ldsa-red rounded-md hover:bg-ldsa-red/10 transition-[background-color] cursor-pointer"
              @click.stop="removerTurma(turma.id)"
            />

            <span
              class="p-1 text-ldsa-green-1 transition-transform duration-300"
              :class="showOptionsMap[turma.id] ? 'rotate-90' : '-rotate-90'"
              @click.stop="toggleOptions(turma.id)"
            >
              <IconsArrow class="w-full" />
            </span>
          </div>
        </div>

        <!-- expansão -->
        <div v-if="showOptionsMap[turma.id]" class="mt-4">
          <!-- opções -->
          <div class="flex gap-2">
            <UIRadio
              v-model="selectedOptionMap[turma.id]"
              :items="[
                { value: 'aulas', label: 'Aulas Agrupadas' },
                { value: 'professores', label: 'Professores' },
              ]"
              v-slot="{ item, selected }"
              class="grid grid-cols-2 gap-2 w-full"
            >
              <div
                class="text-center p-4 text-sm font-semibold border-2 border-ldsa-grey rounded-xl transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                :class="{
                  'bg-ldsa-green-1 border-ldsa-green-1 text-ldsa-white':
                    selected,
                  'hover:bg-ldsa-green-1/50': !selected,
                }"
              >
                <IconsGroupedClass
                  v-if="item.value === 'aulas'"
                  class="w-5 h-5 mb-3 mt-2"
                />
                <IconsEducator
                  v-else-if="item.value === 'professores'"
                  class="w-5 h-5 mb-3 mt-2"
                />

                {{ item.label }}
              </div>
            </UIRadio>
          </div>

          <!-- conteúdo de aulas agrupadas -->
          <div
            v-if="selectedOptionMap[turma.id] === 'aulas'"
            class="mt-5 space-y-4"
          >
            <div
              v-for="(aula, index) in aulasAgrupadas"
              :key="aula.id"
              class="border-2 border-ldsa-grey rounded-lg flex items-center justify-between"
            >
              <button
                class="bg-ldsa-green-1 text-white text-sm font-semibold px-3 py-3 rounded-l-md"
                type="button"
              >
                Dia {{ index + 1 }}
              </button>

              <div class="flex items-center gap-2 text-xs font-semibold">
                <button
                  type="button"
                  class="text-ldsa-green-1 hover:text-ldsa-green-3 transition"
                  @click="decrementarAulas(aula.id)"
                >
                  <IconsArrow class="w-4 h-4" />
                </button>

                <span class="text-sm">Total de aulas: {{ aula.totalAulas }}</span>

                <button
                  type="button"
                  class="text-ldsa-green-1 hover:text-ldsa-green-3 transition"
                  @click="incrementarAulas(aula.id)"
                >
                  <IconsArrow class="transform rotate-180 w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                class="hover:text-ldsa-red transition px-2"
                @click="removerDia(aula.id)"
              >
                <IconsClose class="w-2 h-2" />
              </button>
            </div>

            <button
              type="button"
              class="mx-auto w-full font-semibold text-sm flex justify-center items-center gap-1 mt-4 border-2 border-dotted border-ldsa-grey rounded-lg px-4 py-2 hover:bg-ldsa-grey/20 transition"
              @click="adicionarDia"
            >
              Adicionar Dia +
            </button>
          </div>

          <!-- conteúdo do professor -->
          <div
            v-if="selectedOptionMap[turma.id] === 'professores'"
            class="mt-4 space-y-4"
          >
            <!-- campo de pesquisa -->
            <VVTextField
              v-model="professorSearch"
              label="Pesquisar"
              name="professorSearch"
              placeholder="Digite aqui"
              type="text"
            />

            <!-- lista de usuários filtrados -->
            <div class="gap-3 flex flex-col">
              <UICheckbox
                v-model="professoresSelecionados"
                :items="professoresFiltrados"
                v-slot="{ item, selected, invertItem }"
              >
                <div
                  class="flex items-center gap-3 border-2 rounded-lg pr-3 mb-2 cursor-pointer transition-all duration-200"
                  :class="{
                    'border-ldsa-green-1 bg-ldsa-green-50': selected,
                    'border-ldsa-grey hover:border-ldsa-green-1 hover:bg-ldsa-green-50/10':
                      !selected,
                  }"
                  @click.stop="invertItem(item)"
                >
                  <div
                    class="w-12 h-12 bg-ldsa-grey/20 flex items-center justify-center text-xs font-bold text-ldsa-grey rounded-md overflow-hidden"
                  >
                    <IconsImage />
                  </div>

                  <div class="flex items-center justify-between w-[75%]">
                    <p class="font-semibold text-sm leading-4">
                      {{ item.label }}
                    </p>
                  </div>

                  <UICheckboxSquare
                    :item="item"
                    :active="selected"
                    @click.stop
                  />
                </div>
              </UICheckbox>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="mx-auto w-full font-semibold text-xs flex justify-center items-center gap-1 mt-1 border-2 border-dotted border-ldsa-grey rounded-lg px-4 py-2 hover:bg-ldsa-grey/20 transition"
        @click="addForm"
      >
        Adicionar Turma +
      </button>

      <template #button-group>
        <UIButtonModalGoBack @click="backForm" />
        <UIButtonModalSave @click="closeForm" />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
