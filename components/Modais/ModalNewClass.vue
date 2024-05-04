<script lang="ts" setup defer>
import { useQueryClient } from "@tanstack/vue-query";
import { useForm } from "vee-validate";
import { reactive } from "vue";
import * as yup from "yup";
import { useApiCursosFindAll } from "~/composables/api/cursos";
import { TurmasService, type ModalidadeFindOneResultDto } from "~/infrastructure/api/generated";
import { useApiAmbientesFindAll } from "~/composables/api/ambientes";

const queryClient = useQueryClient();


let isActive = ref(false);

const formValues = reactive({
  curso: {
    id: undefined,
  },
  ambiente: {
    id: null,
  },
  serie: "",
  letra: "",
});


const schema = yup.object().shape({
  curso: yup.object().shape({
    id: yup.string().required("Curso é obrigatório!"),
  }),
  ambiente: yup.object().shape({
    id: yup.string().required("Ambiente é obrigatório!"),
  }),
  serie: yup.string().required("Série é obrigatório!"),
  letra: yup.string().required("Letra é obrigatório!"),
});

const { cursos } = await useApiCursosFindAll("");


const { ambientes } = await useApiAmbientesFindAll("");


const cursoSelecionado = computed(() => cursos.value.find(curso => curso.id === formValues.curso.id));

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const onSubmit = handleSubmit(async (values: any) => {
  await TurmasService.turmaControllerTurmaCreate(values);
  resetForm();
  isActive.value = false;
  await queryClient.invalidateQueries({ queryKey: ["turmas"] });
  window.location.reload();
});

function verificarModalidade(modalidade: ModalidadeFindOneResultDto): "serie-turma" | "periodo" | "nao-implementado" {
  switch (modalidade.id) {
    case "1f08fe79-8f99-493b-ade1-fe082b4761e1":
    case "aab71668-9dfc-46ae-8593-99dcb616a88d":
      {
        return "serie-turma"
      }

    case "3ec92df1-1c11-4990-8664-f17fbbd3ca41":
    case "2fcfc6cb-8f79-44ff-9c06-96a6a955005b":
    case "c6079567-5975-4247-b8bc-892eeeeb1451":
      {
        return "periodo"
      }

    default: {
      return "nao-implementado"
    }
  }
}
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
            <h1 class="main-title">Cadastrar Nova Turma</h1>
          </div>

          <v-divider class="my-4" />

          <div class="form-body modal-form">
            <PagesDashboardCoursesFormsSelectCourseImage />

            <VVAutocomplete v-model="formValues.curso.id" label="Curso" placeholder="Selecione um curso" name="curso.id"
              :items="cursos" item-title="nome" item-value="id" />

            <VVAutocomplete v-model="formValues.ambiente.id" label="Ambiente" placeholder="Selecione um ambiente"
              name="ambiente.id" :items="ambientes" item-title="nome" item-value="id" />

            <template v-if="cursoSelecionado">
              <div v-if="verificarModalidade(cursoSelecionado.modalidade) === 'serie-turma'"
                class="grid grid-cols-[2fr,1fr] gap-4">
                <VVTextField v-model="formValues.serie" type="text" label="Série" placeholder="1°, 2°, 3°..."
                  name="serie" />
                <VVTextField v-model="formValues.letra" type="text" label="Letra" placeholder="A, B, C..."
                  name="letra" />
              </div>
              
              <template v-else-if="verificarModalidade(cursoSelecionado.modalidade) === 'periodo'">
                <VVTextField v-model="formValues.serie" type="text" label="Período"
                  placeholder="1° Período, 2° Período, 3° Período..." name="serie" />
              </template>

              <template v-else>

                <v-alert type="warning">O sistema ainda não suporta o cadastro de turmas para a modalidade {{
                  cursoSelecionado.modalidade.nome }}.</v-alert>

              </template>
            </template>
          </div>
          

          <v-divider />

          <div class="form-footer button-group">
            <VBtn type="button" color="#e9001c" variant="outlined" @click="isActive.value = false"
              class="buttonCancelar">
              <span>Cancelar</span>
            </VBtn>

            <VBtn type="submit" color="#00d047" variant="outlined" class="buttonCadastro">
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
