<script lang="ts" setup>
const props = defineProps({
  searchBarText: String,
});

const $emit = defineEmits(['close']);

const { searchBarText } = toRefs(props);

const selectedDisciplina = ref<string | null>(null); // Variável para armazenar a disciplina selecionada
</script>

<template>
  <v-form class="form">
    <div class="form-header">
      <h1 class="main-title">
        <span>Turma</span>
      </h1>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <v-expansion-panels>
        <v-expansion-panel  class="border-green-600 border-2">
          <v-expansion-panel-title class="custom-panel-title border-none">
            <div class="title-content">
              <div>
                <span class="title-espansion mb-2 font-semibold text-black no-underline inline-block">3°A Informática</span>
                <small class="subtitle">Modalidade: Técnico Integrado</small>
              </div>
              <div class="icons">
                <v-icon small class="icon">mdi-trash-can</v-icon>
              </div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <p>oi</p>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <v-divider />

    <div class="form-footer button-group">
      <UIButtonModalCancelButton @click="$emit('close')" />
      <UIButtonModalAdvancedButton />
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

.custom-panel-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.title-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.subtitle {
  display: block;
  font-size: 15px;
  color: #9ab69e;
  font-weight: 500;
}
.icons {
  display: flex;
  align-items: center;
}

.icon {
  cursor: pointer;
  margin-left: 8px;
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
