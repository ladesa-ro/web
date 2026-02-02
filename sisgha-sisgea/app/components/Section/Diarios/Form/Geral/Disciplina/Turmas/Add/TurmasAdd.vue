<script lang="ts" setup>
import type { TurmaFindOneOutputDto } from '~/helpers/api-client';
import type { TurmaSelecionada } from '../../../Contexto';

const $emit = defineEmits<{
  (e: 'close'): void;
  (e: 'back'): void;
  (e: 'save-turmas', turmas: TurmaSelecionada[]): void;
}>();

const closeForm = () => $emit('close');
const backForm = () => $emit('back');

const formacaoDummy = ref('');
const cursoChecked = ref<string[]>([]);

type CursoApi = {
  nome: string;
  sigla: string;
  turmas: string[];
};

const cursosApi = ref<CursoApi[]>([]);
const isLoading = ref(false);
const turmasSelecionadas = ref<string[]>([]);
const formacaoSelecionada = ref<any>(null);

const turmaId = (cursoSigla: string, turma: string) => `${cursoSigla}-${turma}`;

const loadTurmas = async () => {
  isLoading.value = true;
  try {
    const { data } = await useLadesaApiCrudTurmas().crudModule.list({});
    const cursosMap: Record<string, CursoApi> = {};

    data.forEach((t: TurmaFindOneOutputDto) => {
      const sigla = t.curso.nome;
      if (!cursosMap[sigla]) {
        cursosMap[sigla] = { nome: t.curso.nome, sigla, turmas: [] };
      }
      cursosMap[sigla].turmas.push(t.periodo);
    });

    cursosApi.value = Object.values(cursosMap);
  } catch (error) {
    console.error('Erro ao carregar turmas:', error);
  } finally {
    isLoading.value = false;
  }
};

const isAllSelected = (curso: CursoApi) => {
  return curso.turmas.every(t =>
    turmasSelecionadas.value.includes(turmaId(curso.sigla, t))
  );
};

const someSelected = (curso: CursoApi) => {
  const ids = curso.turmas.map(t => turmaId(curso.sigla, t));
  const count = ids.reduce(
    (acc, id) => acc + (turmasSelecionadas.value.includes(id) ? 1 : 0),
    0
  );
  return count > 0 && count < ids.length;
};

const toggleAll = (curso: CursoApi) => {
  const allSelected = isAllSelected(curso);
  let newSelected = [...turmasSelecionadas.value];

  if (allSelected) {
    newSelected = newSelected.filter(
      t => !curso.turmas.map(tt => turmaId(curso.sigla, tt)).includes(t)
    );
  } else {
    curso.turmas.forEach(t => {
      const id = turmaId(curso.sigla, t);
      if (!newSelected.includes(id)) newSelected.push(id);
    });
  }

  turmasSelecionadas.value = newSelected;
};

const salvarTurmas = () => {
  const turmasObj: TurmaSelecionada[] = [];
  cursosApi.value.forEach(curso => {
    curso.turmas.forEach(turma => {
      const id = turmaId(curso.sigla, turma);
      if (turmasSelecionadas.value.includes(id)) {
        turmasObj.push({ id, nome: `${turma} ${curso.nome}`, turno: 'Turno' });
      }
    });
  });
  $emit('save-turmas', turmasObj);
};

onMounted(() => loadTurmas());
</script>

<template>
  <form class="min-w-[28.125rem]" @submit.prevent>
    <DialogModalBaseLayout
      :on-close="closeForm"
      title="Vincular turmas à disciplina"
    >
      <!-- formacao -->
      <VVAutocompleteAPIOfertaFormacao
        v-model="formacaoSelecionada"
        name="formacao"
        class="w-full mt-2 mb-4"
      />
      <UIAlert
        v-if="turmasSelecionadas.length === 0"
        class="mb-4"
        type="info"
        message="Selecione pelo menos uma turma para continuar"
      />

      <!-- paginacao -->
      <div
        class="flex justify-between items-center text-sm font-semibold mb-1 w-full"
      >
        <button type="button" class="text-ldsa-grey">
          <IconsArrow class="w-4 h-4" />
        </button>
        <p class="flex-grow text-center text-ldsa-text-default">
          Página 1 de 1
        </p>
        <button type="button" class="text-ldsa-grey">
          <IconsArrow class="transform rotate-180 w-4 h-4" />
        </button>
      </div>

      <div v-if="isLoading" class="text-center py-10 text-sm text-gray-400">
        Carregando turmas...
      </div>

      <!-- listagem de cursos e turmas -->
      <div v-else class="grid grid-cols-2 gap-4 max-w-[37.5rem]">
        <div v-for="curso in cursosApi" :key="curso.sigla" class="p-2">
          <!-- curso -->
          <div
            class="flex items-center font-semibold text-xs mb-1 cursor-pointer select-none border-b border-b-ldsa-grey pb-1 gap-3 text-ldsa-text-default"
            @click="toggleAll(curso)"
          >
            <UICheckbox
              :items="['']"
              :model-value="isAllSelected(curso) ? [''] : []"
              @update:modelValue="() => toggleAll(curso)"
              class="mr-2 w-5 h-5"
              @click.stop
            />
            <p class="flex-grow">{{ curso.nome }}</p>
          </div>

          <!-- turmas do curso -->
          <div class="flex flex-col text-xs pr-3">
            <UICheckbox
              v-model="turmasSelecionadas"
              :items="
                curso.turmas.map(t => ({
                  label: t,
                  value: turmaId(curso.sigla, t),
                }))
              "
              gap="0.25rem"
            />
          </div>
        </div>
      </div>

      <template #button-group>
        <UIButtonModalGoBack @click="backForm" />
        <UIButtonModalAdvance @click="salvarTurmas" type="button" /> </template
      ><!-- botoes -->
    </DialogModalBaseLayout>
  </form>
</template>
