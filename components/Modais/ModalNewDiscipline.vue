<script lang="ts" setup>
import { useQueryClient } from "@tanstack/vue-query";
import { useForm } from "vee-validate";
import { reactive } from "vue";
import * as yup from "yup";
import { DisciplinasService } from "~/infrastructure/api/generated";

const queryClient = useQueryClient();

let isActive = ref(false);

const formValues = reactive({
  nome: "",
  nomeAbreviado: "",
  cargaHoraria: "",
});

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório!"),
  nomeAbreviado: yup.string().required("Nome abreviado é obrigatório!"),
  cargaHoraria: yup.string().required("Carga horária é obrigatória!"),
});

const { defineField, handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const onSubmit = handleSubmit(async (values: any) => {
  await DisciplinasService.disciplinaControllerDisciplinaCreate(values);
  resetForm();
  isActive.value = false;
  await queryClient.invalidateQueries({ queryKey: ["disciplinas"] });
});
</script>

<template>
  <v-dialog max-width="500" v-model="isActive">
    <template v-slot:activator="{ props: activatorProps }">
      <UIButtonAdd v-bind="activatorProps" />
    </template>

    <template v-slot:="{ isActive }">
      <v-card class="dialog-style">
        <v-form @submit.prevent="onSubmit" class="form">
          <div class="form-header">
            <h1 class="main-title">Cadastrar Nova Disciplina</h1>
          </div>

          <v-divider class="my-4" />

          <div class="form-body modal-form">
            <PagesDashboardCoursesFormsSelectCourseImage />

            <VVTextField v-model="formValues.nome" type="text" label="Nome" placeholder="Digite aqui" name="nome" />

            <VVTextField
              v-model="formValues.nomeAbreviado"
              type="text"
              label="Nome Abreviado"
              placeholder="Digite aqui"
              name="nomeAbreviado"
            />

            <VVTextField
              v-model="formValues.cargaHoraria"
              type="number"
              label="Carga Horária"
              placeholder="Digite aqui"
              name="cargaHoraria"
            />
          </div>

          <v-divider />

          <div class="form-footer button-group">
            <UIButtonModalCancelButton @click="isActive.value = false">
              <span>Cancelar</span>
            </UIButtonModalCancelButton>

            <UIButtonModalSaveButton>
              <span>Cadastrar</span>
            </UIButtonModalSaveButton>
          </div>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.form {
  overflow: hidden;
}

.form-body {
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
