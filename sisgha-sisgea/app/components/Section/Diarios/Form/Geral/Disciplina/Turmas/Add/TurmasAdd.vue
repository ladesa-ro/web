<script lang="ts" setup>
import { UICheckbox } from '#components';
import { useLadesaApiCrudTurmas } from '#imports';
import type { Ladesa_ManagementService_Domain_Contracts_TurmaFindOneOutput as TurmaFindOneOutput } from '@ladesa-ro/management-service-client';
import { onMounted, ref } from 'vue';
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

    data.forEach((t: TurmaFindOneOutput) => {
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

const cursoCheckboxState = (curso: CursoApi) => {
  const turmasIds = curso.turmas.map(t => turmaId(curso.sigla, t));
  const selecionadas = turmasSelecionadas.value.filter(t =>
    turmasIds.includes(t)
  );
  return {
    checked: selecionadas.length === turmasIds.length,
    indeterminate:
      selecionadas.length > 0 && selecionadas.length < turmasIds.length,
  };
};

const toggleCurso = (curso: CursoApi, checked: boolean) => {
  const turmasIds = curso.turmas.map(t => turmaId(curso.sigla, t));
  if (checked) {
    turmasIds.forEach(id => {
      if (!turmasSelecionadas.value.includes(id))
        turmasSelecionadas.value.push(id);
    });
  } else {
    turmasSelecionadas.value = turmasSelecionadas.value.filter(
      id => !turmasIds.includes(id)
    );
  }
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

      <!-- paginacao -->
      <div
        class="flex justify-between items-center text-xs font-semibold mb-1 w-full"
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
            class="flex items-center font-semibold text-xs mb-2 cursor-pointer select-none border-b border-b-ldsa-grey pb-1 gap-3 text-ldsa-text-default"
            @click="toggleCurso(curso, !cursoCheckboxState(curso).checked)"
          >
            <UICheckboxSquare
              :item="{ label: curso.nome, value: curso.sigla }"
              :active="cursoCheckboxState(curso).checked"
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
              v-slot="{ item, invertItem, selected }"
              gap="0.25rem"
            >
              <div
                class="flex items-center cursor-pointer justify-start gap-3 mb-1"
                @click="invertItem(item)"
              >
                <UICheckboxSquare :item="item" :active="selected" />
                <span>{{ item.label }}</span>
              </div>
            </UICheckbox>
          </div>
        </div>
      </div>

      <!-- botoes -->
      <div class="mt-6 flex justify-between gap-2">
        <UIButtonModalGoBack @click="backForm" />
        <UIButtonModalSave @click="salvarTurmas" type="button" />
      </div>
    </DialogModalBaseLayout>
  </form>
</template>
