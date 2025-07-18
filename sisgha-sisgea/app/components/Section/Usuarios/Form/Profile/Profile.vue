<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { type FormUserOutput, useFormUser } from '../FormUtils';

type Props = { editId?: string | null };
const { editId = null } = defineProps<Props>();

const $emit = defineEmits(['close']);

//

const apiClient = useApiClient();
const queryClient = useQueryClient();

//

const { resetForm, handleSubmit } = useFormUser();

const onSubmit = handleSubmit(async (values: FormUserOutput) => {
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
        vinculoLoop =>
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

//

const onClose = () => $emit('close');
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      :on-close="onClose"
      :title="editId ? 'Editar Usuário' : 'Cadastrar Usuário'"
    >
      <VVSelectImage name="imagem" />

      <VVTextField
        label="Nome"
        name="nome"
        placeholder="Digite aqui"
        type="text"
      />

      <VVTextField
        label="Email"
        name="email"
        placeholder="Digite aqui"
        type="text"
      />

      <VVTextField
        label="Matrícula"
        name="matriculaSiape"
        placeholder="Digite aqui"
        type="text"
      />

      <SectionUsuariosFormProfileRoles />

      <template #button-group>
        <UIButtonModalCancel @click="$emit('close')" />

        <UIButtonModalEdit v-if="editId" />
        <UIButtonModalSave v-else />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
