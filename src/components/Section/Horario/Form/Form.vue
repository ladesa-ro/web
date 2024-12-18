<script setup lang="ts">
import { useForm } from 'vee-validate';
import { defineEmits } from 'vue';
import * as yup from 'yup';

const $emit = defineEmits(['close']);

const schema = yup.object().shape({
  disciplina: yup.object().shape({
    id: yup.string().required('Disciplina é obrigatório!'),
  }),
});

const formInput = reactive({
  disciplina: '',
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
        <span>Adicionar aula</span>
      </h1>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <VVAutocompleteAPIDisciplina name="disciplina.id" />
    </div>

    <v-divider />

    <div
      class="form-footer button-group"
      :class="{ 'justify-center': showAlert }"
    >
      <UIButtonModalCancelButton type="button" @click="$emit('close')" />

      <UIButtonModalAddButton type="submit" />
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
