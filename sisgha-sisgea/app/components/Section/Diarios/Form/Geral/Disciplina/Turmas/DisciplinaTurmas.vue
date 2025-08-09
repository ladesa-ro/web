<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { useContextDiariosFormGeral } from '../../Contexto';
import { UIButtonModalSave } from '#components';

const $emit = defineEmits(['close', 'add', 'back']);

const { disciplinaId } = useContextDiariosFormGeral();

const searchBarText = ref('');

const options = computed(() => ({
  search: unref(searchBarText),
  disciplinaId: disciplinaId.value,
}));

const {
  composables: { useListQuery },
} = useLadesaApiCrudTurmas();

const {
  data: { items: turmas },
  methods: { suspend },
} = useListQuery(options);

await suspend();

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

// Lista mock de professores
const professores = ref([
  {
    id: 1,
    nome: 'Ana Clara Silva',
    cargo: 'Professora de História',
    foto: 'https://i.pravatar.cc/40?img=3',
  },
  {
    id: 2,
    nome: 'João Marcos',
    cargo: 'Professor de Matemática',
    foto: 'https://i.pravatar.cc/40?img=5',
  },
]);

const professorSearch = ref('');

// Lógica de Aulas Agrupadas
const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

type AulaAgrupada = {
  id: number;
  dia: string;
};

const aulasAgrupadas = ref<AulaAgrupada[]>([
  { id: 1, dia: diasSemana[0] ?? 'Segunda' },
]);

let proximoId = 2;

const adicionarDia = () => {
  const total = aulasAgrupadas.value.length;
  const novoDia = diasSemana[total % diasSemana.length] ?? 'Segunda';
  aulasAgrupadas.value.push({ id: proximoId++, dia: novoDia });
};

const removerDia = (id: number) => {
  aulasAgrupadas.value = aulasAgrupadas.value.filter(aula => aula.id !== id);
};
</script>

<template>
  <form class="min-w-[28.125rem]">
    <DialogModalBaseLayout
      :on-close="closeForm"
      title="Gerenciamento de turmas da disciplina"
      title-variant="mini"
    >
      <!-- info disciplina -->
      <div class="border-2 border-ldsa-grey p-4 rounded-xl">
        <span class="font-semibold text-[13px]">Geografia Test</span>
        <p class="font-medium text-[13px] text-ldsa-grey">Carga horária</p>
      </div>

      <!-- card de turma -->
      <div class="border-2 border-ldsa-grey p-4 rounded-xl mt-1">
        <div class="flex items-center justify-between">
          <div>
            <span class="font-semibold text-[13px]">3ºA Informática</span>
            <p class="font-medium text-[13px] text-ldsa-grey">Turno</p>
          </div>
          <div class="flex items-center gap-2">
            <p class="w-4 h-4 text-ldsa-red"><IconsExclude /></p>
            <p class="cursor-pointer text-ldsa-green-1" @click="toggleOptions">
              <IconsArrow
                :class="
                  showOptions
                    ? 'transform rotate-90 transition-transform duration-300'
                    : 'transform -rotate-90 transition-transform duration-300'
                "
              />
            </p>
          </div>
        </div>

        <!-- expansão -->
        <div v-if="showOptions" class="mt-4">
          <!-- opções -->
          <div class="flex gap-2">
            <button
              type="button"
              class="w-full text-center p-4 text-[11px] font-semibold border-2 border-ldsa-grey rounded-xl hover:bg-ldsa-green-1/50 transition flex flex-col items-center justify-center gap-1"
              :class="{
                'bg-ldsa-green-1 border-2 border-ldsa-green-1 text-ldsa-white':
                  selectedOption === 'aulas',
              }"
              @click="selectOption('aulas')"
            >
              <IconsGroupedClass class="w-5 h-5 mb-3 mt-2" />
              Aulas Agrupadas
            </button>
            <button
              type="button"
              class="w-full text-center p-4 text-[11px] font-semibold border-2 border-ldsa-grey rounded-xl hover:bg-ldsa-green-1/50 transition flex flex-col items-center justify-center gap-1"
              :class="{
                'bg-ldsa-green-1 border-2 border-ldsa-green-1 text-ldsa-white':
                  selectedOption === 'professores',
              }"
              @click="selectOption('professores')"
            >
              <IconsEducator class="w-5 h-5 mb-3 mt-2" />
              Professores
            </button>
          </div>

          <!-- conteúdo de aulas agrupadas -->
          <div
            v-if="selectedOption === 'aulas'"
            class="mt-5 space-y-4"
          >
            <!-- blocos de dia -->
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
                  @click=""
                >
                  <IconsArrow class="w-4 h-4" />
                </button>

                <span>Total de aulas: 1</span>

                <button
                  type="button"
                  class="text-ldsa-green-1 hover:text-ldsa-green-3 transition"
                  @click=""
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

            <!-- botão adicionar dia -->
            <button
              type="button"
              class="mx-auto w-full font-semibold text-[12px] flex justify-center items-center gap-1 mt-4 border-2 border-dotted border-ldsa-grey rounded-lg px-4 py-2 hover:bg-ldsa-grey/20 transition"
              @click="adicionarDia"
            >
              <IconsPlus class="w-3 h-3" />
              Adicionar Dia +
            </button>
          </div>

          <!-- conteúdo do professor -->
          <div v-if="selectedOption === 'professores'" class="mt-4 space-y-4">
            <VVTextField
              v-model="professorSearch"
              label="Pesquisar"
              name="professorSearch"
              placeholder="Digite aqui"
              type="text"
              class="text-[11px]"
            />

            <!-- professores -->
            <div class="space-y-2 p-1">
              <div
                v-for="prof in professores.filter(p =>
                  p.nome.toLowerCase().includes(professorSearch.toLowerCase())
                )"
                :key="prof.id"
                class="flex items-center gap-3 border-2 border-ldsa-grey rounded-lg"
              >
                <!-- foto professor -->
                <div
                  class="w-12 h-12 bg-ldsa-grey/20 flex items-center justify-center text-xs font-bold text-ldsa-grey"
                >
                  <IconsImage />
                </div>

                <div class="flex-1 my-2">
                  <p class="font-semibold text-[13px] leading-4">
                    {{ prof.nome }}
                  </p>
                  <p class="text-[12px] text-ldsa-grey">{{ prof.cargo }}</p>
                </div>
                <input
                  type="checkbox"
                  class="w-4 h-4 accent-ldsa-green-1 mr-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="mx-auto w-full font-semibold text-[12px] flex justify-center items-center gap-1 mt-1 border-2 border-dotted border-ldsa-grey rounded-lg px-4 py-2 hover:bg-ldsa-grey/20 transition"
        @click="addForm"
      >
        <IconsPlus class="w-3 h-3" />
        Adicionar Turma +
      </button>

      <!-- botoes -->
      <div class="mt-6 flex justify-between gap-2">
        <UIButtonModalGoBack @click="backForm" />
        <UIButtonModalSave @click="closeForm" />
      </div>
    </DialogModalBaseLayout>
  </form>
</template>
