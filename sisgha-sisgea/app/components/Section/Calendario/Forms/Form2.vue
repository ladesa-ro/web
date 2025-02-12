<script lang="ts" setup>
interface Calendario {
  cor: string;
  inicio: string;
  fim: string;
}

const calendario = ref<Calendario>({
  cor: '#000000',
  inicio: '',
  fim: '',
});

// Emitindo eventos
const closeForm = () => {
  $emit('close');
};

const nextForm = () => {
  $emit('next'); // Emitir o evento de próximo
};

const backform = () => {
  $emit('back'); // Emitir o evento de próximo
};
const $emit = defineEmits(['close', 'next', 'back']);
</script>

<template>
  <form class="form">
    <div class="form-header">
      <h1 class="main-title">
        <span>Cadastrar Calendário</span>
      </h1>
    </div>
    <div class="flex items-center mb-3 mt-4">
      <span class="font-bold mr-2">Etapa 1</span>
      <hr class="divider flex-grow m-0" />
    </div>

    <div class="form-body modal-form">
      <VVTextField
        v-model="calendario.cor"
        class="color-picker-square"
        label="Cor"
        name="nome"
        placeholder="Selecione a cor"
        type="color"
      />

      <div class="date-fields">
        <VVTextField
          v-model="calendario.inicio"
          label="Início"
          name="inicio"
          placeholder="Selecione a data de início"
          type="date"
        />
        <VVTextField
          v-model="calendario.fim"
          label="Término"
          name="fim"
          placeholder="Selecione a data de término"
          type="date"
        />
      </div>
    </div>

    <v-divider />

    <div class="form-footer button-group">
      <UIButtonModalCancelButton @click="closeForm" />
      <UIButtonModalBackButton @click="backform" />
      <UIButtonModalAdvancedButton @click="nextForm" />
    </div>
  </form>
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

.color-picker-square input[type='color']::-webkit-color-swatch {
  width: 50px; /* Largura da barra de cor */
  height: 50px; /* Altura da barra de cor */
  border: none; /* Remove borda da barra de cor */
  background: none; /* Remove fundo da barra de cor */
}

.color-picker-square input[type='color'] {
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
