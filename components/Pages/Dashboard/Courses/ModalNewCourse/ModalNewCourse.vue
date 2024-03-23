<script lang="ts" setup>
import { useQueryClient } from "@tanstack/vue-query";
import { reactive } from "vue";
import { CursosService } from "~/infrastructure/api/generated";
import { useApiModalitiesFindAll } from "~/composables/api/modalities";
import { useApiCampusFindAll } from "~/composables/api/campus";
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate'

const queryClient = useQueryClient();

let isActive = ref(false);

const options = [
  "Técnico Integrado",
  "Técnico Subsequente",
  "Técnico Concomitante",
  "Graduação",
];

const formValues = reactive({
  nome: "",
  nomeAbreviado: "",
  modalidade: {
    id: undefined,
  },
  campus: {
    id: undefined,
  },
});

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório!"),
  nomeAbreviado: yup.string().required("Nome abreviado é obrigatório!"),
  modalidade: yup.object().shape({
    id: yup.string().required("Modalidade é obrigatória!"),
  }),
  campus: yup.object().shape({
    id: yup.string().required("Campus é obrigatório!"),
  }),
});


const { modalidade } = await useApiModalitiesFindAll("");

const { campi } = await useApiCampusFindAll("");

const { defineField, handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});


const onSubmit = handleSubmit(async (values: any) => {
  await CursosService.cursoControllerCursoCreate(values);
  resetForm();
  isActive.value = false;
  await queryClient.invalidateQueries({ queryKey: ["cursos"] });
});



</script>
<template>
  <v-dialog  max-width="500"  v-model="isActive">
    <template v-slot:activator="{ props: activatorProps }">
      <UIButtonAdd v-bind="activatorProps" />
    </template>
    <template v-slot:="{ isActive }">
      <v-card class="dialog-style" >
        <v-form @submit.prevent="onSubmit" class="form">
          <h1 class="main-title">Cadastrar Novo Curso</h1>
          <div class="modal-form">
            <PagesDashboardCoursesFormsSelectCourseImage />

            <VVTextField
              v-model="formValues.nome"
              type="text"
              label="Nome"
              placeholder="Digite aqui"
              name="nome"
              />
            
            <VVTextField
              v-model="formValues.nomeAbreviado"
              type="text"
              label="Nome Abreviado"
              placeholder="Digite aqui"
              name="nomeAbreviado"
              />

              <VVAutocomplete
              v-model="formValues.modalidade.id"
              label="Modalidade"
              placeholder="Selecione a modalidade"
              name="modalidade.id"
              :items="modalidade"
              item-title="nome"
              item-value="id"
              />

            <VVAutocomplete
              v-model="formValues.campus.id"
              name="campus.id"
              label="Campus"
              placeholder="Selecione o campus"
              :items="campi"
              item-title="apelido"
              item-value="id"
            />

          </div>
          <div class="button-group">
            <button @click="isActive.value = false" type="button" class="buttonCancelar Cancel">
              <span>Cancelar</span>
            </button>
            <button class="buttonCadastro Cad" type="submit">
              <span>Cadastrar</span>
            </button>
          </div>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.dialog-style {
  border-radius: 14px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: solid 2px #9ab69e;
}

.form {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 32px;
}
.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  /* Centraliza os botões no modal */
  gap: 20px;
  /* Espaço entre os botões */
}

.button {
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  border: none;
}

.buttonCadastro {
  background-color: #00d047;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;

}

.buttonCancelar {
  background-color: #e9001c;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}

@media (max-width: 600px) {
  .button-group {
    flex-direction: column;
    /* Empilha os botões verticalmente em telas pequenas */
  }

  .button {
    width: 100%;
    /* Faz os botões ocuparem toda a largura do modal em telas pequenas */
  }
}
</style>
