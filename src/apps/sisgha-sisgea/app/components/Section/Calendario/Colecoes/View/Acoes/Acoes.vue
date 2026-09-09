<script lang="ts" setup>
const props = defineProps<{
  colecaoId: string;
  donoAtualNome?: string | null;
}>();
const emit = defineEmits<{ transferred: []; deleted: [] }>();

const colecoes = useCalendarioColecao();
const confirmDelete = useConfirmDelete();

async function handleDelete() {
  const confirmed = await confirmDelete.confirm();
  if (!confirmed) return;
  await colecoes.remove(props.colecaoId);
  await colecoes.invalidate();
  emit('deleted');
}
</script>

<template>
  <div class="u-flex u-flex-col u-gap-4">
    <h2 class="u-font-semibold u-text-lg">Ações</h2>

    <div class="u-flex u-flex-wrap u-gap-3">
      <SectionCalendarioColecoesViewAcoesTransferirDonoModal
        :colecao-id="colecaoId"
        :dono-atual-nome="donoAtualNome"
        @transferred="emit('transferred')"
      />

      <UIButtonModalDelete @click="handleDelete" />
    </div>
  </div>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    title="Excluir coleção"
    message="Deseja realmente excluir esta coleção? Os eventos não são apagados, só ficam sem coleção."
    @confirm="confirmDelete.onConfirm"
  />
</template>
