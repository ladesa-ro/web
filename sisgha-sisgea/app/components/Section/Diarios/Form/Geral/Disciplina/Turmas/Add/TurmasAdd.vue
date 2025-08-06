<script lang="ts" setup>
import { defineEmits, ref } from 'vue';

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
        <button type="button" class="text-ldsa-grey" @click="">
          <IconsArrow class="w-4 h-4" />
        </button>

        <span class="flex-grow text-center">Página 1 de 1</span>

        <button type="button" class="text-ldsa-grey" @click="">
          <IconsArrow class="transform rotate-180 w-4 h-4" />
        </button>
      </div>

      <div class="overflow-x-auto ">
        <div class="grid grid-cols-3 gap-3">
          <div v-for="curso in cursos" :key="curso.nome" class="p-2">
            <h3
              class="font-semibold text-[12px] mb-2 text-center border-b-1 border-b-ldsa-grey"
            >
              {{ curso.nome }}
            </h3>
            <div class="flex flex-col gap-2 text-xs">
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
