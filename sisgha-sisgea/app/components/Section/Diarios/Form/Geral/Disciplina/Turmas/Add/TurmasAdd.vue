<script lang="ts" setup>
import { defineEmits, ref, computed, watch } from 'vue';

const $emit = defineEmits(['close', 'back']);

const closeForm = () => $emit('close');
const backForm = () => $emit('back');

const formacoes = ['Técnico Integrado', 'Graduação', 'Pós-Graduação'];

const cursos = [
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

const turmasSelecionadas = ref<string[]>([]);

const turmaId = (cursoSigla: string, turma: string) => `${cursoSigla}-${turma}`;

// Função que retorna o estado do checkbox do curso (checked/indeterminado)
const cursoCheckboxState = (curso: typeof cursos[0]) => {
  const turmasIds = curso.turmas.map(t => turmaId(curso.sigla, t));
  const selecionadas = turmasSelecionadas.value.filter(t => turmasIds.includes(t));
  const todasSelecionadas = selecionadas.length === turmasIds.length;
  const nenhumaSelecionada = selecionadas.length === 0;
  return {
    checked: todasSelecionadas,
    indeterminate: !todasSelecionadas && !nenhumaSelecionada,
  };
};

// Função para marcar ou desmarcar todas as turmas de um curso
const toggleCurso = (curso: typeof cursos[0], checked: boolean) => {
  const turmasIds = curso.turmas.map(t => turmaId(curso.sigla, t));
  if (checked) {
    // adicionar as turmas que ainda não estão selecionadas
    turmasIds.forEach(id => {
      if (!turmasSelecionadas.value.includes(id)) turmasSelecionadas.value.push(id);
    });
  } else {
    // remover as turmas do curso
    turmasSelecionadas.value = turmasSelecionadas.value.filter(id => !turmasIds.includes(id));
  }
};
</script>

<template>
  <form class="min-w-[28.125rem]">
    <DialogModalBaseLayout
      :on-close="closeForm"
      title="Vincular turmas à disciplina"
      title-variant="x-small"
    >
      <VVAutocomplete
        :items="formacoes"
        class="w-full mt-2 mb-4"
        label="Formação"
        name="formacao"
        placeholder="Selecione uma formação"
      />

      <div
        class="flex justify-between items-center text-xs font-semibold mb-1 w-full"
      >
        <button type="button" class="text-ldsa-grey" @click="() => {}">
          <IconsArrow class="w-4 h-4" />
        </button>

        <span class="flex-grow text-center">Página 1 de 1</span>

        <button type="button" class="text-ldsa-grey" @click="() => {}">
          <IconsArrow class="transform rotate-180 w-4 h-4" />
        </button>
      </div>

      <div>
        <div class="grid grid-cols-3 gap-3">
          <div v-for="curso in cursos" :key="curso.nome" class="p-2">
            <label
              class="flex items-center justify-center gap-2 font-semibold text-[12px] mb-2 border-b border-b-ldsa-grey cursor-pointer select-none"
            >
              <input
                type="checkbox"
                :checked="cursoCheckboxState(curso).checked"
                ref="el => {
                  if(el) el.indeterminate = cursoCheckboxState(curso).indeterminate
                }"
                @change="(e: Event) => toggleCurso(curso, (e.target as HTMLInputElement)?.checked ?? false)"

                class="accent-ldsa-green-1"
              />
              {{ curso.nome }}
            </label>
            <div class="flex flex-col gap-1 text-xs">
              <label
                v-for="turma in curso.turmas"
                :key="turmaId(curso.sigla, turma)"
                class="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  :value="turmaId(curso.sigla, turma)"
                  v-model="turmasSelecionadas"
                  class="accent-ldsa-green-1"
                />
                {{ turma }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- seção de botoes -->
      <div class="mt-6 flex justify-between gap-2">
        <UIButtonModalGoBack @click="backForm" />
        <UIButtonModalSave @click="closeForm" />
      </div>
    </DialogModalBaseLayout>
  </form>
</template>
