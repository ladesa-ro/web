<script lang="ts" setup>
import { useQueryClient } from "@tanstack/vue-query";
import { useForm } from "vee-validate";
import { computed } from "vue";
import * as yup from "yup";
import { useApiClient, useApiCursosFindOne } from "~/composables";

const $emit = defineEmits(["close", "next"]);

const nextForm = () => {
  $emit("next"); // Emitir o evento de próximo
};

const years = [2024, 2023, 2022, 2021, 2020, 2019];

const closeForm = () => {
  $emit("close");
};

type Props = {
  editId?: string | null;
};

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

//

const editIdRef = toRef(props, "editId");

const apiClient = useApiClient();
const queryClient = useQueryClient();

const { curso: currentCurso } = await useApiCursosFindOne(editIdRef);

type FormValues = {
  imagem: Blob | null | undefined;

  ofertaFormacao: {
    id: string | null;
  };
  campus: {
    id: string | null;
  };

  nome: string;

  nomeAbreviado: string;
};

type FormOutput = {
  imagem: Blob | null | undefined;

  ofertaFormacao: {
    id: string;
  };
  campus: {
    id: string;
  };

  nome: string;

  nomeAbreviado: string;
};

const initialFormValues = reactive({
  imagem: null,
  ofertaFormacao: {
    id: currentCurso.value?.ofertaFormacao?.id ?? null,
  },

  campus: {
    id: currentCurso.value?.campus?.id ?? null,
  },
  nome: currentCurso.value?.nome ?? "",
  nomeAbreviado: currentCurso.value?.nomeAbreviado ?? "",
});

const handleDelete = async () => {
  const id = editIdRef.value;

  if (!id) return;

  const resposta = window.confirm("Você tem certeza de que deseja deletar esse curso?");

  if (resposta) {
    await apiClient.cursos.cursoDeleteOneById({ id: id });
    await queryClient.invalidateQueries({ queryKey: ["cursos"] });
    $emit("close");
  }
};

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional(),
  modalidade: yup.object().shape({
    id: yup.string().required("Modalidade é obrigatório!"),
  }),
  campus: yup.object().shape({
    id: yup.string().required("Campus é obrigatório!"),
  }),

  nome: yup.string().required("Nome do bloco é obrigatório!"),
  nomeAbreviado: yup.string().required("Nome abreviado do bloco é obrigatório!"),
});

const {
  resetForm,
  handleSubmit,
  setFieldValue,
  values: formValues,
} = useForm<FormValues, FormOutput>({
  validationSchema: schema,
  initialValues: initialFormValues,
});

const onSubmit = handleSubmit(async (values: FormOutput) => {
  const editId = editIdRef.value;

  const { imagem, ...data } = values;

  let id;

  if (editId === null) {
    const cursoCriado = await apiClient.cursos.cursoCreate({
      requestBody: { ...data },
    });

    id = cursoCriado.id;
  } else {
    await apiClient.cursos.cursoUpdateOneById({
      id: editId,

      requestBody: {
        ...values,
      },
    });

    id = editId;
  }

  if (imagem) {
    await apiClient.cursos.cursoSetImagemCapa({
      id: id,
      formData: {
        file: imagem,
      },
    });
  }

  await queryClient.invalidateQueries({
    queryKey: ["cursos"],
  });

  resetForm();
  $emit("close");
}, console.error);

const nome = computed({
  get: () => formValues.nome,
  set: (value) => {
    formValues.nome = value;
  },
});
</script>

<template>
  <v-form @submit.prevent="onSubmit" class="form">
    <div class="form-header">
      <h1 class="main-title">
        <span>Cadastrar novo calendário</span>
      </h1>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <VVTextField v-model="nome" type="text" label="Nome" placeholder="Digite aqui" name="nome" />

      <VVAutocomplete
        name="year.id"
        label="Ano letivo"
        placeholder="Selecione um ano"
        :items="years"
        class="xl:max-w-[100%]"
      />

      <VVAutocompleteAPIModalidade name="modalidade.id" />

      <VVAutocompleteAPICurso name="curso.id" />
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
