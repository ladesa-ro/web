<script lang="ts" setup>
type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const calendarioLetivo = useCalendarioLetivo();
const { data: calendario, isLoading, isError } = calendarioLetivo.findOne(ref(resourceId));

const confirmDelete = useConfirmDelete();
const router = useRouter();

const handleDelete = async () => {
  const confirmed = await confirmDelete.confirm();
  if (confirmed) {
    await calendarioLetivo.remove(resourceId);
    await calendarioLetivo.invalidate();
    router.push('/sisgha/dape/calendario');
  }
};
</script>

<template>
  <UIResourceView
    :title="calendario?.nome ?? ''"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #header-actions>
      <UIButtonModalDelete @click="handleDelete" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup>
        <UIResourceViewField label="Nome" :value="calendario?.nome" />
        <UIResourceViewField label="Ano" :value="calendario?.ano" />
        <UIResourceViewField label="Campus" :value="calendario?.campus?.apelido" />
        <UIResourceViewField
          label="Oferta de Formação"
          :value="calendario?.ofertaFormacao?.nome"
        />
      </UIResourceViewFieldGroup>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este calendário letivo?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
