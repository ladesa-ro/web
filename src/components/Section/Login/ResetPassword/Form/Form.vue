<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const $emit = defineEmits(['close']);

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Por favor, digite um e-mail válido!')
    .required('Email é obrigatório.'),
});

const formInput = reactive({
  email: '',
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formInput,
});

const showAlert = ref(false);

const onSubmit = handleSubmit(
  (formData) => {
    console.log('Formulário válido, pronto para enviar!', { formData });
    showAlert.value = true;
  },
  (errors) => {
    console.error('Erro de validação:', errors);
  }
);
</script>
<template>
  <v-form class="form" @submit.prevent="onSubmit">
    <div class="form-header">
      <h1 class="main-title text-center">
        <span>Redefinir Senha</span>
      </h1>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <VVTextField
        type="email"
        name="email"
        label="E-mail"
        :disabled="showAlert"
        placeholder="Digite aqui seu email"
      />

      <v-alert
        v-if="showAlert"
        class="text-sm"
        variant="flat"
        density="compact"
        type="info"
        text="Se o endereço de e-mail existir, você receberá as instruções para a redefinição de senha em sua caixa de entrada."
      />
    </div>

    <v-divider />

    <div
      class="form-footer button-group"
      :class="{ 'justify-center': showAlert }"
    >
      <UIButtonModalCancelButton
        v-if="!showAlert"
        type="button"
        @click="$emit('close')"
      />

      <UIButtonModalOkButton
        v-if="showAlert"
        type="button"
        class="!px-10"
        @click="$emit('close')"
      />

      <UIButtonModalResetButton v-if="!showAlert" type="submit" />
    </div>
  </v-form>
</template>

<style scoped>
.main-title {
  font-size: 24px;
  font-weight: 700;
}

.form {
  display: flex;
  flex-direction: column;
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
