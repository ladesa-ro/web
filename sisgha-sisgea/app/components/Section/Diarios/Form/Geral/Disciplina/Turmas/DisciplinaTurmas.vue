<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useContextDiariosFormGeral } from '../../Contexto';
import type { TurmaSelecionada } from '../../Contexto';

const $emit = defineEmits(['close', 'add', 'back']);

const { disciplinaSelecionada, turmasSelecionadas } = useContextDiariosFormGeral();

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
  turmasAdicionadas.value = turmasAdicionadas.value.filter(t => t.id !== turmaId);
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

const showOptions = ref(false);
const selectedOption = ref<'aulas' | 'professores' | null>(null);

const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};

const selectOption = (option: 'aulas' | 'professores') => {
  selectedOption.value = option;
};

const closeForm = () => $emit('close');
const addForm = () => $emit('add');
const backForm = () => $emit('back');

const { composables: { useListQuery } } = useLadesaApiCrudUsuarios();

const searchBarText = ref('');
const queries = computed(() => ({ search: searchBarText.value }));

const { data: { items: usuarios }, methods: { suspend } } = useListQuery(queries);

await suspend();

const professores = computed(() => {
  if (!usuarios.value) return [];
  return usuarios.value.map(u => ({ ...u, selecionado: false })).toSorted((a, b) =>
    a.nome.localeCompare(b.nome)
  );
});

const professorSearch = ref('');
const professoresFiltrados = computed(() =>
  professores.value.filter(p =>
    p.nome.toLowerCase().includes(professorSearch.value.toLowerCase())
  )
);

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
        <span class="font-semibold text-[0.813rem]">{{ disciplinaSelecionada?.nome }}</span>
        <p class="font-medium text-[0.813rem] text-ldsa-grey">{{ disciplinaSelecionada?.cargaHoraria }}H</p>
      </div>

      <!-- card de turma -->
      <div
        v-for="turma in turmasAdicionadas"
        :key="turma.id"
        class="border-2 border-ldsa-grey p-4 rounded-xl mt-1"
      >
        <div class="flex items-center justify-between">
          <div>
            <span class="font-semibold text-[0.812rem]">{{ turma.nome }}</span>
            <p class="font-medium text-[0.812rem] text-ldsa-grey">
              {{ turma.turno }}
            </p>
          </div>

          <div class="flex items-center">
            <IconsExclude
              class="w-8.5 p-2 text-ldsa-red rounded-md hover:bg-ldsa-red/10 transition-[background-color] cursor-pointer"
              @click="removerTurma(turma.id)"
            />

            <span
              class="cursor-pointer p-2 text-ldsa-green-1 transition-transform duration-300"
              :class="showOptions ? 'rotate-90' : '-rotate-90'"
              @click="toggleOptions"
            >
              <IconsArrow class="w-full" />
            </span>
          </div>
        </div>

        <!-- expansão -->
        <div v-if="showOptions" class="mt-4">
          <!-- opções -->
          <div class="flex gap-2">
            <UIRadio
              v-model="selectedOption"
              :items="[
                { value: 'aulas', label: 'Aulas Agrupadas' },
                { value: 'professores', label: 'Professores' },
              ]"
              v-slot="{ item, selected }"
              class="grid grid-cols-2 gap-2 w-full"
            >
              <div
                class="text-center p-4 text-xs font-semibold border-2 border-ldsa-grey rounded-xl transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                :class="{
                  'bg-ldsa-green-1 border-ldsa-green-1 text-ldsa-white': selected,
                  'hover:bg-ldsa-green-1/50': !selected,
                }"
              >
                <IconsGroupedClass v-if="item.value === 'aulas'" class="w-5 h-5 mb-3 mt-2" />
                <IconsEducator v-else-if="item.value === 'professores'" class="w-5 h-5 mb-3 mt-2" />

                {{ item.label }}
              </div>
            </UIRadio>
          </div>

          <!-- conteúdo de aulas agrupadas -->
          <div v-if="selectedOption === 'aulas'" class="mt-5 space-y-4">
            <div
              v-for="(aula, index) in aulasAgrupadas"
              :key="aula.id"
              class="border-2 border-ldsa-grey rounded-lg flex items-center justify-between"
            >
              <button
                class="bg-ldsa-green-1 text-white text-xs font-semibold px-3 py-3 rounded-l-md"
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

                <span>Total de aulas: {{ aula.totalAulas }}</span>

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
              class="mx-auto w-full font-semibold text-xs flex justify-center items-center gap-1 mt-4 border-2 border-dotted border-ldsa-grey rounded-lg px-4 py-2 hover:bg-ldsa-grey/20 transition"
              @click="adicionarDia"
            >
              Adicionar Dia +
            </button>
          </div>

          <!-- conteúdo do professor -->
          <div v-if="selectedOption === 'professores'" class="mt-4 space-y-4">
            <!-- campo de pesquisa -->
            <VVTextField
              v-model="professorSearch"
              label="Pesquisar"
              name="professorSearch"
              placeholder="Digite aqui"
              type="text"
            />

            <!-- lista de usuários filtrados -->
            <div class="space-y-2 p-1">
              <div
                v-for="prof in professoresFiltrados"
                :key="prof.id"
                class="flex items-center gap-3 border-2 border-ldsa-grey rounded-lg"
              >
                <div
                  class="w-12 h-12 bg-ldsa-grey/20 flex items-center justify-center text-xs font-bold text-ldsa-grey"
                >
                  <img v-if="prof.foto" :src="prof.foto" alt="Foto do usuário" class="w-full h-full object-cover rounded-md"/>
                  <IconsImage v-else />
                </div>

                <div class="flex-1 my-2">
                  <p class="font-semibold text-[0.812rem] leading-4">{{ prof.nome }}</p>
                  <p class="text-xs text-ldsa-grey">{{ prof.cargo }}</p>
                </div>

                <input
                  type="checkbox"
                  class="w-4 h-4 accent-ldsa-green-1 mr-3"
                  v-model="prof.selecionado"
                />
              </div>
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
