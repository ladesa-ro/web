<script lang="ts" setup>
import AmbientesForm from '../Form/Form.vue';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const ambientes = useAmbientes();
const {
  data: ambiente,
  isLoading,
  isError,
} = ambientes.findOne(ref(resourceId));

const { data: coverImageSrc } = ambientes.imageCover(ref(resourceId));

const { confirmDelete, handleDelete } = useResourceDelete({
  remove: id => ambientes.remove(id),
  invalidate: () => ambientes.invalidate(),
  redirectTo: '/sisgea/ambientes',
});
</script>

<template>
  <UIResourceView
    :title="ambiente?.nome ?? ''"
    :subtitle="ambiente?.descricao"
    :image-src="coverImageSrc"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #breadcrumb />

    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="AmbientesForm"
      />
      <UIButtonModalDelete @click="handleDelete(resourceId)" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup :columns="3">
        <UIResourceViewField label="Nome" :value="ambiente?.nome" />
        <UIResourceViewField label="Código" :value="ambiente?.codigo" />
        <UIResourceViewField
          label="Capacidade"
          :value="
            ambiente?.capacidade ? `${ambiente.capacidade} pessoas` : null
          "
        />
        <UIResourceViewField label="Tipo" :value="ambiente?.tipo" />
        <UIResourceViewField label="Bloco" :value="ambiente?.bloco?.nome" />
        <UIResourceViewField
          label="Campus"
          :value="ambiente?.bloco?.campus?.apelido"
        />
      </UIResourceViewFieldGroup>
    </template>

    <template #related>
      <UICollapsible class="border-2 border-ldsa-grey rounded-lg">
        <template #trigger>
          <div
            class="flex items-center justify-between p-5 hover:bg-ldsa-grey/10 font-medium"
          >
            Indisponibilidade

            <IconsArrow class="text-ldsa-text-green" />
          </div>
        </template>

        <div class="p-5 pt-0">
          <SectionCalendarioIndisponibilidadeProfessor
            tipo-entidade="ambiente"
            :entidade-id="resourceId"
          />
        </div>
      </UICollapsible>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este ambiente?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
