<script lang="ts" setup>
import { FormMode } from '~/utils/constants';
import { ApiImageResource, useApiImageRoute } from '~/utils/integrations/api/core/images-util';
import { ofertaFormacaoSchema, transformForApi } from './-Helpers/schema';
import Form1 from './Form1.vue';
import Form2 from './Form2.vue';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const ofertasFormacoes = useOfertasFormacoes();
const confirmDelete = useConfirmDelete();

const ofertaFormacaoQuery = ofertasFormacoes.findOne(computed(() => editId));
const coverSrc = useApiImageRoute(ApiImageResource.OFERTA_FORMACAO_COVER, ofertaFormacaoQuery.data);

const { form, mode, isBusy, isLoading, onSubmit, onDelete } = useEntityForm({
  schema: ofertaFormacaoSchema,
  editId: computed(() => editId),
  getQuery: ofertaFormacaoQuery,

  create: async (data) => {
    const { imagem, ...rest } = data;
    const created = await ofertasFormacoes.create(transformForApi(rest));
    if (imagem && created?.id) await ofertasFormacoes.uploadCover(created.id, imagem);
  },
  update: async (id, data) => {
    const { imagem, ...rest } = data;
    await ofertasFormacoes.update(id, transformForApi(rest));
    if (imagem) await ofertasFormacoes.uploadCover(id, imagem);
  },
  remove: id => ofertasFormacoes.remove(id),
  invalidate: ofertasFormacoes.invalidate,
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});

const currentStep = ref(1);

const advanceToStep2 = async () => {
  const result = await form.validate();

  const step1Fields = [
    'nome',
    'slug',
    'duracaoPeriodoEmMeses',
    'modalidade.id',
    'campus.id',
    'niveisFormacoes',
  ];

  const hasStep1Errors = Object.keys(result.errors).some(key =>
    step1Fields.some(field => key.startsWith(field))
  );

  if (!hasStep1Errors) {
    currentStep.value = 2;
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Form1
      v-if="currentStep === 1"
      :mode="mode"
      :is-busy="isBusy"
      :is-loading="isLoading"
      :cover-src="coverSrc"
      @close="emit('close')"
      @next="advanceToStep2"
      @delete="onDelete"
    />

    <Form2
      v-else-if="currentStep === 2"
      :mode="mode"
      :is-busy="isBusy"
      :edit-id="editId"
      @previous="currentStep = 1"
      @close="emit('close')"
    />
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta formação?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
