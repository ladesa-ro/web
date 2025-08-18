<script lang="ts" setup>
import { computed, defineEmits, ref, watch } from 'vue';
import type { TurmaSelecionada } from '../../../Contexto';

const $emit = defineEmits<{
  (e: 'close'): void;
  (e: 'back'): void;
  (e: 'save-turmas', turmas: TurmaSelecionada[]): void;
}>();

const closeForm = () => $emit('close');
const backForm = () => $emit('back');

const formacoes = ['Técnico Integrado', 'Graduação', 'Pós-Graduação'];

const formacaoSelecionada = ref('Técnico Integrado');

const cursosTecnico = [
  {
    nome: 'Química',
    sigla: 'QUI',
    turmas: ['1ºA', '1ºB', '2ºA', '2ºB', '3ºA', '3ºB'],
  },
  {
    nome: 'Informática',
    sigla: 'INF',
    turmas: ['1ºA', '1ºB', '2ºA', '2ºB', '3ºA', '3ºB'],
  },
  {
    nome: 'Floresta',
    sigla: 'FLO',
    turmas: ['1ºA', '1ºB', '2ºA', '2ºB', '3ºA', '3ºB'],
  },
];

const cursosGraduacao = [
  {
    nome: 'Engenharia de Software',
    sigla: 'ESW',
    turmas: ['1º Período', '2º Período', '3º Período', '4º Período'],
  },
  {
    nome: 'Ciência da Computação',
    sigla: 'CC',
    turmas: ['1º Período', '2º Período', '3º Período', '4º Período'],
  },
];

const cursosPosGraduacao = [
  {
    nome: 'Gestão de Projetos',
    sigla: 'GP',
    turmas: ['1º Período', '2º Período', '3º Período', '4º Período'],
  },
  {
    nome: 'Segurança da Informação',
    sigla: 'SI',
    turmas: ['1º Período', '2º Período', '3º Período', '4º Período'],
  },
];

const cursos = computed(() => {
  if (formacaoSelecionada.value === 'Graduação') return cursosGraduacao;
  if (formacaoSelecionada.value === 'Pós-Graduação') return cursosPosGraduacao;
  return cursosTecnico;
});

const turmasSelecionadas = ref<string[]>([]);

const turmaId = (cursoSigla: string, turma: string) => `${cursoSigla}-${turma}`;

const cursoCheckboxState = (curso: (typeof cursosTecnico)[0]) => {
  const turmasIds = curso.turmas.map(t => turmaId(curso.sigla, t));
  const selecionadas = turmasSelecionadas.value.filter(t =>
    turmasIds.includes(t)
  );
  const todasSelecionadas = selecionadas.length === turmasIds.length;
  const nenhumaSelecionada = selecionadas.length === 0;
  return {
    checked: todasSelecionadas,
    indeterminate: !todasSelecionadas && !nenhumaSelecionada,
  };
};

const toggleCurso = (curso: (typeof cursosTecnico)[0], checked: boolean) => {
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
  cursos.value.forEach(curso => {
    curso.turmas.forEach(turma => {
      const id = turmaId(curso.sigla, turma);
      if (turmasSelecionadas.value.includes(id)) {
        turmasObj.push({ id, nome: `${turma} ${curso.nome}`, turno: 'Turno' });
      }
    });
  });
  $emit('save-turmas', turmasObj);
};

watch(formacaoSelecionada, () => {
  turmasSelecionadas.value = [];
});
</script>

<template>
  <form class="min-w-[28.125rem]" @submit.prevent>
    <DialogModalBaseLayout
      :on-close="closeForm"
      title="Vincular turmas à disciplina"
      title-variant="mini"
    >
      <VVAutocomplete
        v-model="formacaoSelecionada"
        :items="formacoes"
        name="formacao"
        class="w-full mt-2 mb-4"
        label="Formação"
        placeholder="Selecione uma formação"
      />

      <div
        class="flex justify-between items-center text-xs font-semibold mb-1 w-full"
      >
        <button type="button" class="text-ldsa-grey">
          <IconsArrow class="w-4 h-4" />
        </button>
        <span class="flex-grow text-center">Página 1 de 1</span>
        <button type="button" class="text-ldsa-grey">
          <IconsArrow class="transform rotate-180 w-4 h-4" />
        </button>
      </div>

      <div>
        <div class="grid grid-cols-3 gap-4 max-w-[37.5rem] mx-auto">
          <div v-for="curso in cursos" :key="curso.nome" class="p-2">
            <label
              class="flex items-center gap-2 font-semibold text-xs mb-2 cursor-pointer select-none border-b border-b-ldsa-grey pb-1"
            >
              <input
                type="checkbox"
                :checked="cursoCheckboxState(curso).checked"
                ref="el => { if(el) el.indeterminate = cursoCheckboxState(curso).indeterminate }"
                @change="
                  (e: Event) =>
                    toggleCurso(
                      curso,
                      (e.target as HTMLInputElement)?.checked ?? false
                    )
                "
                class="accent-ldsa-green-1 w-4 h-4 flex-shrink-0"
              />
              <span class="flex-grow">{{ curso.nome }}</span>
            </label>
            <div class="flex flex-col gap-1 text-xs">
              <label
                v-for="turma in curso.turmas"
                :key="turmaId(curso.sigla, turma)"
                class="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :value="turmaId(curso.sigla, turma)"
                  v-model="turmasSelecionadas"
                  class="accent-ldsa-green-1 w-4 h-4 flex-shrink-0"
                />
                <span>{{ turma }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-between gap-2">
        <UIButtonModalGoBack @click="backForm" />
        <UIButtonModalSave @click="salvarTurmas" type="button" />
      </div>
    </DialogModalBaseLayout>
  </form>
</template>
