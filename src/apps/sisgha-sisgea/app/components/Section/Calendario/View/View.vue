<script lang="ts" setup>
type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const calendarioLetivo = useCalendarioLetivo();
const {
  data: calendario,
  isLoading,
  isError,
} = calendarioLetivo.findOne(ref(resourceId));

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

const confirmDeactivate = useConfirmDelete();

// TODO: remove after SDK regeneration includes 'situacao' field
const calendarioRecord = computed(
  () => calendario.value as Record<string, unknown> | undefined
);
const situacao = computed(
  () => calendarioRecord.value?.situacao as string | undefined
);
const isInativo = computed(() => situacao.value === 'INATIVO');

const handleToggleSituacao = async () => {
  const confirmed = await confirmDeactivate.confirm();
  if (confirmed) {
    const novaSituacao = isInativo.value ? 'ATIVO' : 'INATIVO';
    await calendarioLetivo.update(resourceId, {
      situacao: novaSituacao,
    } as Record<string, string>);
    await calendarioLetivo.invalidate();
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
      <UIButtonModalBaseLayout
        v-if="!isInativo"
        text="Desativar"
        :opacity="85"
        color="var(--ladesa-red-color)"
        type="button"
        @click="handleToggleSituacao"
      />
      <UIButtonModalBaseLayout
        v-else
        text="Reativar"
        :opacity="85"
        color="var(--ladesa-green-color, #22c55e)"
        type="button"
        @click="handleToggleSituacao"
      />
      <UIButtonModalDelete @click="handleDelete" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup>
        <UIResourceViewField label="Nome" :value="calendario?.nome" />
        <UIResourceViewField label="Ano" :value="calendario?.ano" />
        <UIResourceViewField
          label="Campus"
          :value="calendario?.campus?.apelido"
        />
        <UIResourceViewField
          label="Oferta de Formação"
          :value="calendario?.ofertaFormacao?.nome"
        />
        <UIResourceViewField label="Situação" :value="situacao" />
      </UIResourceViewFieldGroup>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este calendário letivo?"
    @confirm="confirmDelete.onConfirm"
  />

  <DialogConfirm
    v-model="confirmDeactivate.isOpen.value"
    :message="
      isInativo
        ? 'Deseja reativar este calendário letivo?'
        : 'Deseja desativar este calendário letivo?'
    "
    @confirm="confirmDeactivate.onConfirm"
  />
</template>
