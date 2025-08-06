<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { useContextDiariosFormGeral } from '../../Contexto';

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

</script>

<template>
  <form class="min-w-[28.125rem]">
    <DialogModalBaseLayout
      :on-close="closeForm"
      title="Gerenciamento de turmas da disciplina"
      title-variant="x-small"
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
            <p class="cursor-pointer" @click="toggleOptions"><IconsArrow /></p>
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
              <IconsGroupedClass class="w-5 h-5" />
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
              <IconsEducator class="w-5 h-5" />
              Professores
            </button>
          </div>

          <!-- conteudo de cada opcao -->
          <div
            v-if="selectedOption === 'aulas'"
            class="mt-4 p-3 border"
          >
            <p class="text-sm font-medium text-gray-700">
              
            </p>
          </div>

          <div
            v-if="selectedOption === 'professores'"
            class="mt-4 p-3 border"
          >          
              <!-- foto do professor + nome + cargo | checkbox -->
          </div>
        </div>
      </div>
    </DialogModalBaseLayout>
  </form>
</template>