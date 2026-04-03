<script lang="ts" setup>
import { useToast } from '#imports';
import { type FormUserOutput, useFormUser } from '../FormUtils';

const { showToast } = useToast();

type Props = { editId?: string | null };
const { editId = null } = defineProps<Props>();

const $emit = defineEmits(['close']);

const usuarios = useUsuarios();
const { resetForm, handleSubmit } = useFormUser();

const onSubmit = handleSubmit(async (values: FormUserOutput) => {
  try {
    const { imagem, vinculos, ...data } = values;

    const vinculosPayload = vinculos
      .filter(v => v.campus?.id && v.cargo)
      .map(v => ({ campus: { id: v.campus.id }, cargo: v.cargo }));

    let id;

    if (editId === null) {
      const usuarioCriado = await usuarios.create({
        ...data,
        vinculos: vinculosPayload,
      });
      id = usuarioCriado.id;
      showToast('cadastro', 'success');
    } else {
      await usuarios.update(editId, {
        ...data,
        vinculos: vinculosPayload,
      });
      id = editId;
      showToast('atualizacao', 'success');
    }

    if (imagem) {
      await usuarios.uploadProfile(id, imagem);
      showToast('atualizacao', 'success');
    }

    await usuarios.invalidate();

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
  <form class="h-full" @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      :on-close="onClose"
      :title="editId ? 'Editar Usuário' : 'Cadastrar Usuário'"
      class="w-full h-full overflow-x-hidden overflow-y-auto"
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
