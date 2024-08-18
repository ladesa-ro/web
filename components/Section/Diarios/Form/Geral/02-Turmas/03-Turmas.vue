<script lang="ts" setup>
import { ref, computed, unref } from 'vue';
import {
    turmasBaseQueryKey,
  useApiBaseResourceList,
  useTurmasRetriever,
} from '~/integrations';

const $emit = defineEmits(['close', 'next', 'back']);

const searchBarText = ref('');

const backForm = () => {
  $emit('back');
};

const options = computed(() => ({
  search: unref(searchBarText),
}));

const turmasRetriever = useTurmasRetriever();

const { previousItems: turmas } = await useApiBaseResourceList(
  turmasBaseQueryKey,
  turmasRetriever,
  options
);

const selectedTurma = ref<string | null>(null);

const closeForm = () => {
  $emit('close');
};

const onTurmaSelect = (turmaId: string | null) => {
  selectedTurma.value = turmaId;
};
</script>

<template>
  <v-form class="form">
    <div class="form-header">
      <h1 class="main-title">
        <span>Adicionar turmas</span>
      </h1>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <UISearchBar
        :value="searchBarText"
        @update:value="searchBarText = $event"
      />

      <UIGridSelectionDiscipline :items="turmas ?? []">
        <template #item="{ item: turma }">
          <SectionDiariosFormGeral02TurmasSelectionCardTurmas
            :turma="turma"
            :selected-turma="selectedTurma"
            :on-turma-select="onTurmaSelect"
          />
        </template>
      </UIGridSelectionDiscipline>
    </div>

    <v-divider />
        <div class="button-group">
        <UIButtonModalBackButton @click="backForm"/>
        <UIButtonModalCancelButton @click="closeForm" />
        <UIButtonModalAddClassButton/>
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
}

.form {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 32px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: nowrap;
  gap: 10px;
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
