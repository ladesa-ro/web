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

const closeForm = () => $emit('close');
const nextForm = () => $emit('next');
</script>

<template>
  <form class="min-w-[28.125rem]">
    <DialogModalBaseLayout
      :on-close="closeForm"
      title="Selecione uma Disciplina"
    >
      <UISearchBar v-model="searchBarText" />

      <!-- TODO: substituir este componente do vuetify pelo componente UIRadio, que já está adaptado para estilos personalizados (se necessário, altere o código dele) @soouzaana -->
      <v-radio-group v-model="selectedDisciplina" class="!overflow-x-hidden">
        <!-- TODO: arrumar a lógica do componente UIGriSelectionDiscipline (que tem grid no nome, mas não é grid, é uma lista simples vertical. arrume o nome também). se quiser, pode excluir este componente e fazer toda a lógica e estilização no arquivo atual. faça da forma que preferir @soouzaana -->
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
