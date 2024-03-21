<script lang="ts" setup>
import { useQueryClient } from "@tanstack/vue-query";
import { reactive } from "vue";
import { CursosService } from "~/infrastructure/api/generated";

const queryClient = useQueryClient();

let isActive = ref(false);

const formData = reactive({
  nome: "",
  nomeAbreviado: "",
  campus: {
    id: "50987cbb-01a2-4345-8974-cae554ffca51",
  },
  modalidade: {
    id: "d8dda4ae-de9c-483c-ba89-b7c8bef120f5",
  },
});

const salvarCurso = async () => {
  await CursosService.cursoControllerCursoCreate(formData);
  isActive.value = false;
  await queryClient.invalidateQueries({ queryKey: ["cursos"] });
  
};
</script>
<template>
  <v-dialog class="dialog-style" max-width="500"  v-model="isActive">
    <template v-slot:activator="{ props: activatorProps }">
      <UIButtonAdd v-bind="activatorProps" />
    </template>
    <template v-slot:="{ isActive }">
      <v-card>
        <form @submit.prevent="salvarCurso" class="form">
          <h1 class="main-title">Cadastrar Novo Curso</h1>
          <div class="modal-form">
            <PagesDashboardCoursesFormsSelectCourseImage />

            <UITextFieldBase
              v-model="formData.nome"
              label="Nome"
              placeholder="Digite aqui"
            />
            <UITextFieldBase
              v-model="formData.nomeAbreviado"
              label="Nome Abreviado"
              placeholder="Digite aqui"
            />

            <PagesDashboardCoursesFormsSelectModality />
          </div>
          <div class="button-group">
            <button class="button Cancel">
              <span>Cancelar</span>
            </button>
            <button class="button Cad" type="submit">
              <span>Cadastrar</span>
            </button>
          </div>
        </form>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.main-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.dialog-style {
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-style: solid 2px #9ab69e;
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
  /* Centraliza os botões no modal */
  gap: 20px;
  /* Espaço entre os botões */
}

.button {
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.Cancel,
.Cad {
  transition: color 0.2s ease;
}

.svgCad,
.svgCancel {
  vertical-align: middle;
  margin-left: 8px;
}

.Cad:hover {
  color: #00d047;
}

.Cancel:hover {
  color: #e9001c;
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
