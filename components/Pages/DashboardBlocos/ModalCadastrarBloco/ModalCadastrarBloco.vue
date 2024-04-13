<script lang="ts" setup>
import { useQueryClient } from "@tanstack/vue-query";
import { useForm } from "vee-validate";
import { reactive } from "vue";
import * as yup from "yup";
import { useApiCampusFindAll } from "~/composables/api/campus";
import { useApiModalitiesFindAll } from "~/composables/api/modalities";
import { CursosService } from "~/infrastructure/api/generated";

let isActive = ref(false);

const formValues = reactive({
  nome: "",
  nomeAbreviado: "",
  campus: {
    id: undefined,
  },
  curso: {
    id: undefined,
  },
});

const campi = "";
const cursos = "";

</script>

<template>
  <v-dialog max-width="500" v-model="isActive">
    <template v-slot:activator="{ props: activatorProps }">
      <UIButtonAdd v-bind="activatorProps" />
    </template>

    <!-- Form -->
    <template v-slot:="{ isActive }">
      <v-card class="dialog-style">
        <v-form class="form">
          <div class="form-header">
            <h1 class="main-title">Cadastrar Novo Bloco</h1>
          </div>

          <!-- Inputs -->
          <div class="form-body modal-form">
            
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
              v-model="formValues.campus.id"
              name="campus.id"
              label="Campus"
              placeholder="Selecione o campus"
              :items="campi"
              item-title="apelido"
              item-value="id"
            />
            
            <VVAutocomplete
              v-model="formValues.curso.id"
              name="curso.id"
              label="Cursos"
              placeholder="Selecione o curso"
              :items="cursos"
              item-title="apelido"
              item-value="id"
            />
          </div>

          <!-- Submits -->
          <div class="form-footer button-group">
            <VBtn type="button" color="#e9001c" variant="outlined" @click="isActive.value = false" class="button-cancelar">
              <span>Cancelar</span>
            </VBtn>

            <VBtn type="submit" color="#00d047" variant="outlined" class="button-cadastrar">
              <span>Cadastrar</span>
            </VBtn>
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

.v-btn.button-cancelar,
.v-btn.button-cadastrar {
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

  .v-btn.button-cancelar,
  .v-btn.button-cadastrar {
    padding: 6px 20px;
  }
}
</style>