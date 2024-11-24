<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { useFormUser, type FormUserOutput } from '../FormUtils';

const apiClient = useApiClient();
const queryClient = useQueryClient();

//

type Props = {
  editId?: string | null;
};

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

//

const editIdRef = toRef(props, 'editId');

const $emit = defineEmits(['close']);

const { resetForm, handleSubmit } = useFormUser();

const onSubmit = handleSubmit(async (values: FormUserOutput) => {
  const editId = editIdRef.value;

  const { imagem, vinculos, ...data } = values;

  let id;

  if (editId === null) {
    const usuarioCriado = await apiClient.usuarios.usuarioCreate({
      requestBody: { ...data },
    });

    id = usuarioCriado.id;
  } else {
    await apiClient.usuarios.usuarioUpdateOneById({
      id: editId,

      requestBody: {
        ...values,
      },
    });

    id = editId;
  }

  for (const vinculo of vinculos) {
    if (
      !vinculo.ativo &&
      vinculos.some(
        (vinculoLoop) =>
          vinculoLoop.ativo === true &&
          vinculoLoop.campus.id === vinculo.campus.id
      )
    ) {
      continue;
    }

    await apiClient.perfis.perfilUpdateOneById({
      requestBody: {
        usuario: { id: id },
        campus: { id: vinculo.campus.id },
        cargos: vinculo.cargos,
      },
    });
  }

  if (imagem) {
    await apiClient.usuarios.usuarioSetImagemCapa({
      id: id,
      formData: {
        file: imagem,
      },
    });
  }

  await queryClient.invalidateQueries({
    queryKey: ['usuarios'],
  });

  resetForm();
  $emit('close');
}, console.error);
</script>

<template>
  <v-form @submit.prevent="onSubmit" class="p-5 overflow-auto">
    <div class="modal">
      <div class="form-header">
        <h1 class="main-title">
          <span v-if="editId">Editar Usuário</span>
          <span v-else>Cadastrar Usuário</span>
        </h1>
      </div>

      <v-divider class="my-4" />

      <div class="flex flex-col gap-5">
        <VVSelectImage name="imagem" />

        <VVTextField
          type="text"
          label="Nome"
          placeholder="Digite aqui"
          name="nome"
        />

        <VVTextField
          type="text"
          label="Email"
          placeholder="Digite aqui"
          name="email"
        />

        <VVTextField
          type="text"
          label="Matrícula"
          placeholder="Digite aqui"
          name="matriculaSiape"
        />

        <SectionUsuariosFormProfileRoles />
      </div>

      <div class="form-footer button-group">
        <UIButtonModalCancelButton @click="$emit('close')" />

        <UIButtonModalEditButton v-if="editId" />
        <UIButtonModalSaveButton v-else />
      </div>
    </div>
  </v-form>
</template>

<style scoped>
.modal {
  text-align: center;
}

.form {
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
