<script lang="ts" setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
  searchBarText: String,
});

const $emit = defineEmits(['close']);

const { searchBarText } = toRefs(props);
const { disciplinas } = await useApiDisciplinasFindAll(searchBarText);
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
      <UIGridSelectionDiscipline :items="disciplinas">
        <template #item="{ item: disciplina }">
          <UICardSelectionDiscipline variant="block">
            <template #title>
              {{ disciplina.nome }}
            </template>

            <template #actions>
              <v-radio class="detail"></v-radio>
            </template>

            <UICardLine>
              <span class="text-left w-full block"
                >Carga Horária: {{ disciplina.cargaHoraria }}</span
              >
            </UICardLine>
          </UICardSelectionDiscipline>
        </template>
      </UIGridSelectionDiscipline>
    </div>

    <v-divider />

    <div class="form-footer button-group">
      <UIButtonModalCancelButton @click="$emit('close')" />
      <UIButtonModalSaveButton />
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
</style>
