<script lang="ts" setup>
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const diarios = useDiarios();
const { data: diario, isLoading, isError } = diarios.findOne(ref(resourceId));

const professoresQuery = diarios.listProfessores(resourceId);
const professoresList = computed(
  () => professoresQuery.data.value?.data ?? []
);

const professoresText = computed(() => {
  if (professoresList.value.length === 0) return '-';
  return professoresList.value
    .map(p => p.perfil.usuario.nome)
    .join(', ');
});

const disciplina = computed(() => diario.value?.disciplina);
const coverImageSrc = useApiImageRoute(ApiImageResource.DISCIPLINA_COVER, disciplina);

const confirmDelete = useConfirmDelete();
const router = useRouter();

const handleDelete = async () => {
  const confirmed = await confirmDelete.confirm();
  if (confirmed) {
    await diarios.remove(resourceId);
    await diarios.invalidate();
    router.push('/sisgha/dape/diarios');
  }
};
</script>

<template>
  <UIResourceView
    :title="diario?.disciplina?.nome ?? ''"
    :subtitle="`${diario?.turma?.periodo ?? ''} - ${diario?.turma?.curso?.ofertaFormacao?.nome ?? ''}`"
    :image-src="coverImageSrc"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #header-actions>
      <LazySectionDiariosModal :edit-id="resourceId" />
      <UIButtonModalDelete @click="handleDelete" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup :columns="3">
        <UIResourceViewField
          label="Disciplina"
          :value="diario?.disciplina?.nome"
        />
        <UIResourceViewField
          label="Turma"
          :value="diario?.turma?.periodo ? `${diario.turma.periodo} - ${diario.turma.curso?.nomeAbreviado ?? ''}` : null"
        />
        <UIResourceViewField
          label="Ativo"
          :value="diario?.ativo ? 'Sim' : 'Não'"
        />
        <UIResourceViewField
          label="Calendário Letivo"
          :value="diario?.calendarioLetivo?.nome"
        />
        <UIResourceViewField
          label="Ambiente Padrão"
          :value="diario?.ambientePadrao?.nome"
        />
        <UIResourceViewField
          label="Professores"
          :value="professoresText"
        />
      </UIResourceViewFieldGroup>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este diário?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
