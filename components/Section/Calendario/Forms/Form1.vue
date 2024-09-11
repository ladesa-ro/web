<script lang="ts" setup>

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
    <div class="flex items-center mb-3">
  <!-- Texto à esquerda -->
  <span class="font-bold mr-2">Etapa 1</span>

  <!-- Linha à direita -->
  <hr class="divider flex-grow m-0" />
</div>


    <div class="form-body modal-form">
      <input type="color">
    </div>

    <v-divider />

    <div class="form-footer button-group">
        <div class="form-footer button-group">
      <UIButtonModalCancelButton @click="closeForm" />
      <UIButtonModalAdvancedButton @click="nextForm" />
    </div>
    </div>
  </v-form>
</template>

<style scoped>
/* .form {
	overflow: hidden;
}

.form-body {
	overflow: auto;
} */

.form {
  overflow: auto;
}

.divider{
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