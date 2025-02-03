<script lang="ts" setup>
import {
  disciplinasBaseQueryKey,
  useApiBaseResourceList,
  useDisciplinasRetriever,
} from '~/utils';
import { useContextDiariosFormGeral } from '../../Contexto';

const $emit = defineEmits(['close', 'next']);

// =====================================================

const { disciplinaId: selectedDisciplina } = useContextDiariosFormGeral();
// mesma coisa que:
// const selectedDisciplina = useContextDiariosFormGeral().disciplinaId;

// =====================================================

const searchBarText = ref('');

const options = computed(() => ({
  search: unref(searchBarText),
}));

const disciplinasRetriever = useDisciplinasRetriever();

const { previousItems: disciplinas } = await useApiBaseResourceList(
  disciplinasBaseQueryKey,
  disciplinasRetriever,
  options
);

const closeForm = () => {
  $emit('close');
};

const nextForm = () => {
  $emit('next');
};
</script>

<template>
  <form class="min-w-[28.125rem]">
    <DialogModalBaseLayout
      :on-close="closeForm"
      title="Selecione uma Disciplina"
    >
      <UISearchBar
        :value="searchBarText"
        @update:value="searchBarText = $event"
        class="mt-[0.313rem]"
      />

      <v-radio-group v-model="selectedDisciplina" class="!overflow-x-hidden">
        <UIGridSelectionDiscipline :items="disciplinas ?? []">
          <template #item="{ item: disciplina }">
            <SectionDiariosFormGeralDisciplinaSelectCard
              :disciplina="disciplina"
            />
          </template>
        </UIGridSelectionDiscipline>
      </v-radio-group>

      <template #button-group>
        <UIButtonModalCancelButton @click="closeForm" />
        <UIButtonModalAdvancedButton
          :disabled="!selectedDisciplina"
          @click="nextForm"
        />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
