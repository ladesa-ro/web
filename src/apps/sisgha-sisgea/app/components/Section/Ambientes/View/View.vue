<script lang="ts" setup>
import EntityDetailPage from '../../-Shared/EntityDetailPage.vue';
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
</script>

<template>
  <EntityDetailPage
    :resource-id="resourceId"
    :form-component="AmbientesForm"
    :title="ambiente?.nome"
    :subtitle="ambiente?.descricao"
    :image-src="coverImageSrc"
    :is-loading="isLoading"
    :is-error="isError"
    delete-message="Deseja realmente excluir este ambiente?"
    :remove="id => ambientes.remove(id)"
    :invalidate="() => ambientes.invalidate()"
    redirect-to="/sisgea/ambientes"
  >
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
      <UICollapsible class="u-rounded-lg ambiente-collapsible">
        <template #trigger>
          <div
            class="u-flex u-items-center u-justify-between u-p-5 u-font-medium ambiente-collapsible__trigger"
          >
            Indisponibilidade

            <IconsArrow class="ambiente-collapsible__icon" />
          </div>
        </template>

        <div class="u-p-5 u-pt-0">
          <SectionCalendarioIndisponibilidadeProfessor
            tipo-entidade="ambiente"
            :entidade-id="resourceId"
          />
        </div>
      </UICollapsible>
    </template>
  </EntityDetailPage>
</template>

<style scoped>
.ambiente-collapsible {
  border: 2px solid var(--ladesa-grey-color);
}

.ambiente-collapsible__trigger:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.ambiente-collapsible__icon {
  color: var(--ladesa-text-green-color);
}
</style>
