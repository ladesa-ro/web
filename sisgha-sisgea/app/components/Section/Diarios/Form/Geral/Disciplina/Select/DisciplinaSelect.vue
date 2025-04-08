<script lang="ts" setup>
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

const {
  composables: { useListQuery },
} = useLadesaApiCrudDisciplinas();

const {
  data: { items: disciplinas },
  methods: { suspend },
} = useListQuery(options);

await suspend();

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
        class="mt-[0.313rem]"
        @update:value="searchBarText = $event"
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
        <UIButtonModalCancel @click="closeForm" />
        <UIButtonModalAdvance
          :disabled="!selectedDisciplina"
          @click="nextForm"
        />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
