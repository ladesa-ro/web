<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import {
  disciplinasBaseQueryKey,
  useApiBaseResourceList,
  useDisciplinasRetriever,
} from '~/integrations';

const $emit = defineEmits(['close', 'next']);

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

const selectedDisciplina = ref<string | null>(null);

const closeForm = () => {
  $emit('close');
};

const nextForm = () => {
  $emit('next');
};
</script>

<template>
  <v-form class="form">
    <div class="form-header">
      <h1 class="main-title">
        <span>Disciplina</span>
      </h1>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <UISearchBar
        :value="searchBarText"
        @update:value="searchBarText = $event"
      />

      <v-radio-group v-model="selectedDisciplina">
        <UIGridSelectionDiscipline :items="disciplinas ?? []">
          <template #item="{ item: disciplina }">
            <SectionDiariosFormGeral01DisciplinaSelectionCard
              :disciplina="disciplina"
            />
          </template>
        </UIGridSelectionDiscipline>
      </v-radio-group>
    </div>

    <v-divider />

    <div class="form-footer button-group">
      <UIButtonModalCancelButton @click="closeForm" />
      <UIButtonModalAdvancedButton @click="nextForm" />
    </div>
  </v-form>
</template>

<style scoped>
.form {
  overflow: auto;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;

  padding: 32px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 20px;
}

.button {
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  border: none;
}

.v-btn.buttonCancelar,
.v-btn.buttonCadastro {
  padding: 6px 20px;
  border-radius: 8px;
  height: auto;
  text-transform: none;
}

@media screen and (max-width: 450px) {
  .button-group {
    flex-direction: column;
    gap: 10px;
  }

  .v-btn.buttonCancelar,
  .v-btn.buttonCadastro {
    padding: 6px 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
