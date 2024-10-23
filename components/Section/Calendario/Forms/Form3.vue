<script lang="ts" setup>
import { ref } from 'vue';

interface Calendario {
  cor: string;
  inicio: string; // trocar para Date dps!
  fim: string; // trocar para Date dps!
}

const calendario = ref<Calendario>({
  cor: '#000000',
  inicio: '',
  fim: '',
});

const backform = () => {
  $emit('back'); // Emitir o evento de próximo
};

const closeForm = () => {
  $emit('close');
};

const nextForm = () => {
  $emit('next');
};

const $emit = defineEmits(['close', 'next', 'back']);
</script>

<template>
  <v-form class="form">
    <div class="form-header">
      <h1 class="main-title">
        <span>Cadastrar novo calendário</span>
      </h1>
    </div>
    <div class="flex items-center mb-3 mt-4">
      <span class="font-bold mr-2">Recuperação 1</span>
      <hr class="divider flex-grow m-0" />
    </div>

    <div class="form-body modal-form">
      <VVTextField
        v-model="calendario.cor"
        type="color"
        label="Cor"
        placeholder="Selecione a cor"
        name="nome"
        class="color-picker-square"
      />

      <div class="date-fields">
        <VVTextField
          v-model="calendario.inicio"
          type="date"
          label="Início"
          placeholder="Selecione a data de início"
          name="inicio"
        />
        <VVTextField
          v-model="calendario.fim"
          type="date"
          label="Término"
          placeholder="Selecione a data de término"
          name="fim"
        />
      </div>

      <div class="flex items-center mt-4">
        <span class="font-bold mr-2">Recuperação 2</span>
        <hr class="divider flex-grow m-0" />
      </div>

      <VVTextField
        v-model="calendario.cor"
        type="color"
        label="Cor"
        placeholder="Selecione a cor"
        name="nome"
        class="color-picker-square"
      />

      <div class="date-fields">
        <VVTextField
          v-model="calendario.inicio"
          type="date"
          label="Início"
          placeholder="Selecione a data de início"
          name="inicio"
        />
        <VVTextField
          v-model="calendario.fim"
          type="date"
          label="Término"
          placeholder="Selecione a data de término"
          name="fim"
        />
      </div>

      <div class="flex items-center mt-4">
        <span class="font-bold mr-2">Exame</span>
        <hr class="divider flex-grow m-0" />
      </div>

      <VVTextField
        v-model="calendario.cor"
        type="color"
        label="Cor"
        placeholder="Selecione a cor"
        name="nome"
        class="color-picker-square"
      />

      <div class="date-fields">
        <VVTextField
          v-model="calendario.inicio"
          type="date"
          label="Início"
          placeholder="Selecione a data de início"
          name="inicio"
        />
        <VVTextField
          v-model="calendario.fim"
          type="date"
          label="Término"
          placeholder="Selecione a data de término"
          name="fim"
        />
      </div>
    </div>

    <v-divider />

    <div class="form-footer button-group">
      <UIButtonModalCancelButton @click="closeForm" />
      <UIButtonModalBackButton @click="backform" />
      <UIButtonModalAdvancedButton @click="nextForm" />
    </div>
  </v-form>
</template>

<style scoped>
.form {
  overflow: auto;
}

.divider {
  border: 1px solid #9ab69e;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  gap: 0px;
}

.color-picker-square input[type="color"]::-webkit-color-swatch {
  width: 50px;
  height: 50px; 
  border: none; 
  background: none; 
}

.color-picker-square input[type="color"] {
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  cursor: pointer;
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

.date-fields {
  display: flex; 
  gap: 20px; 
}

.date-fields .v-text-field {
  flex: 1; 
}
</style>
