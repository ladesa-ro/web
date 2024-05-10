<template>
  <v-dialog v-model="dialog" class="" max-width="450">
    <template v-slot:activator="{ on }">
      <div v-on="on"></div>
    </template>

    <v-card class="dialog-style">
      <v-card-text>
        <v-form class="form">
          <div class="form-header">
            <h1 class="main-title">
              <span>Redefinir Senha</span>
            </h1>
          </div>

          <v-divider class="my-4" />

          <div class="form-body modal-form">
            <VVTextField
              type="text"
              label="E-mail"
              placeholder="Digite aqui seu email"
              name="email"
              v-model="formData.email"
              :error-messages="emailErrors"
            />

            <span>Um email de redefinição será enviado para você caso a conta exista</span>

          </div>

          <v-divider />

          <div class="form-footer button-group">
            <UIButtonModalCancelButton class="buttonCancelar" @click="cancelar">Cancelar</UIButtonModalCancelButton>
            <UIButtonModalResetButton class="buttonCadastro" @click="submitForm">Redefinir</UIButtonModalResetButton>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import * as yup from 'yup';
import { ref } from 'vue';

const schema = yup.object().shape({
  email: yup.string().required('Email é obrigatório').email('Por favor, digite um e-mail válido!'),
});

const formData = {
  email: '',
};

let dialog = ref(true);

const emailErrors = ref([]);

const submitForm = () => {
  schema.validate(formData, { abortEarly: false })
    .then(() => {
      console.log('Formulário válido, pronto para enviar!');
    })
    .catch(errors => {
      emailErrors.value = errors.errors;
      console.error('Erro de validação:', errors);
    });
};

const cancelar = () => {
  dialog.value = false; // Corrigido: definindo dialog como false para fechar a janela
};
</script>

<style scoped>
.dialog-style {
  border-radius: 14px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: solid 2px #9ab69e;
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

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }

  .v-btn.buttonCancelar,
  .v-btn.buttonCadastro {
    padding: 6px 20px;
  }
}
</style>
