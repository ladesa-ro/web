<script lang="ts" setup>
import { useToast } from '#imports';
import { useQueryClient } from '@tanstack/vue-query';
import {
  usuarioCreate,
  usuarioUpdate,
  usuarioUpdateImagemCapa,
} from '@ladesa-ro/web.api.client';
import { type FormUserOutput, useFormUser } from '../FormUtils';

const { showToast } = useToast();

type Props = { editId?: string | null };
const { editId = null } = defineProps<Props>();

const $emit = defineEmits(['close']);

const api = useApiClient();
const queryClient = useQueryClient();

const { resetForm, handleSubmit } = useFormUser();

const onSubmit = handleSubmit(async (values: FormUserOutput) => {
  try {
    const { imagem, vinculos, ...data } = values;
    let id;

    if (editId === null) {
      const usuarioCriado = await api.call(usuarioCreate, {
        body: { ...data },
      });
      id = usuarioCriado.id;
      showToast('cadastro', 'success');
    } else {
      await api.call(usuarioUpdate, {
        path: { id: editId },
        body: { ...data },
      });
      id = editId;
      showToast('atualizacao', 'success');
    }

    // TODO: perfilSetVinculos endpoint was removed from the API.
    // Vinculos management needs to be updated when a replacement endpoint is available.
    // for (const vinculo of vinculos) {
    //   ...
    // }

    if (imagem) {
      await api.call(usuarioUpdateImagemCapa, {
        path: { id },
        body: { file: imagem },
      });
      showToast('atualizacao', 'success');
    }

    await queryClient.invalidateQueries({ queryKey: ['usuarios'] });

    resetForm();
    $emit('close');
  } catch (error: any) {
    console.error(error);
    showToast(
      editId ? 'atualizacao' : 'cadastro',
      'error',
      'Ocorreu um erro ao salvar o usuário. Tente novamente.'
    );
  }
}, console.error);

const onClose = () => $emit('close');
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      :on-close="onClose"
      :title="editId ? 'Editar Usuário' : 'Cadastrar Usuário'"
      class="w-full h-auto max-h-[90vh] overflow-x-hidden overflow-y-auto"
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
        name="matricula"
        placeholder="Digite aqui"
        type="text"
      />

      <SectionUsuariosFormProfileRoles />

      <template #button-group>
        <div class="flex flex-col sm:flex-row gap-2 justify-between w-full">
          <UIButtonModalCancel @click="$emit('close')" />

          <UIButtonModalEdit v-if="editId" />
          <UIButtonModalSave v-else />
        </div>
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
