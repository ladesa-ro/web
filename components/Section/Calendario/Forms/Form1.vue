<script lang="ts" setup>
import { ref } from 'vue';

const cor = ref('#000000'); // Define o model para a cor

const closeForm = () => {
  $emit('close');
};

const nextForm = () => {
  $emit('next');
};

const $emit = defineEmits(['close', 'next']);
</script>

<template>
  <v-form class="form">
    <div class="form-header">
      <h1 class="main-title">
        <span>Cadastrar novo calendário</span>
      </h1>
    </div>
    <div class="flex items-center mb-3 mt-4">
      <span class="font-bold mr-2">Etapa 1</span>
      <hr class="divider flex-grow m-0" />
    </div>

    <div class="form-body modal-form">
      <VVTextField
        v-model="cor"
        type="color"
        label="Cor"
        placeholder="Selecione a cor"
        name="nome"
        class="color-picker-square"
      />

      <div class="date-fields">
        <VVTextField
          v-model="inicio"
          type="date"
          label="Início"
          placeholder="Selecione a data de início"
          name="inicio"
        />
        <VVTextField
          v-model="fim"
          type="date"
          label="Término"
          placeholder="Selecione a data de término"
          name="fim"
        />
      </div>

      <div class="flex items-center mt-4">
      <span class="font-bold mr-2">Etapa 2</span>
      <hr class="divider flex-grow m-0" />
    </div>

    <VVTextField
        v-model="cor"
        type="color"
        label="Cor"
        placeholder="Selecione a cor"
        name="nome"
        class="color-picker-square"
      />

      <div class="date-fields">
        <VVTextField
          v-model="inicio"
          type="date"
          label="Início"
          placeholder="Selecione a data de início"
          name="inicio"
        />
        <VVTextField
          v-model="fim"
          type="date"
          label="Término"
          placeholder="Selecione a data de término"
          name="fim"
        />
      </div>

    <div class="flex items-center mt-4">
      <span class="font-bold mr-2">Etapa 3</span>
      <hr class="divider flex-grow m-0" />
    </div>



    <VVTextField
        v-model="cor"
        type="color"
        label="Cor"
        placeholder="Selecione a cor"
        name="nome"
        class="color-picker-square"
      />

      <div class="date-fields">
        <VVTextField
          v-model="inicio"
          type="date"
          label="Início"
          placeholder="Selecione a data de início"
          name="inicio"
        />
        <VVTextField
          v-model="fim"
          type="date"
          label="Término"
          placeholder="Selecione a data de término"
          name="fim"
        />
      </div>

    <div class="flex items-center mt-4">
      <span class="font-bold mr-2">Etapa 4</span>
      <hr class="divider flex-grow m-0" />
    </div>

    <VVTextField
        v-model="cor"
        type="color"
        label="Cor"
        placeholder="Selecione a cor"
        name="nome"
        class="color-picker-square"
      />

      <div class="date-fields">
        <VVTextField
          v-model="inicio"
          type="date"
          label="Início"
          placeholder="Selecione a data de início"
          name="inicio"
        />
        <VVTextField
          v-model="fim"
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
  gap: 153px;
}

.color-picker-square input[type="color"]::-webkit-color-swatch {
  width: 50px; /* Largura da barra de cor */
  height: 50px; /* Altura da barra de cor */
  border: none; /* Remove borda da barra de cor */
  background: none; /* Remove fundo da barra de cor */
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
  display: flex; /* Habilita o Flexbox */
  gap: 20px; /* Espaçamento entre os campos */
}

.date-fields .v-text-field {
  flex: 1; /* Faz com que cada campo de data ocupe espaço igual */
}

</style>
