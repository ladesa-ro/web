<script lang="ts" setup>
import ColecoesForm from '../Form/Form.vue';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const router = useRouter();
const colecoes = useCalendarioColecao();

const { data: colecao, isLoading, isError } = colecoes.findOne(ref(resourceId));

const visibilidadeLabel = computed(() => {
  switch (colecao.value?.visibilidade) {
    case 'CAMPUS':
      return 'Campus';
    case 'PUBLICA':
      return 'Pública';
    default:
      return 'Privada';
  }
});

const activeTab = ref<'acessos' | 'acoes'>('acessos');

function handleDeleted() {
  router.push('/sisgha/dape/calendario/colecoes');
}
</script>

<template>
  <UIResourceView
    :title="colecao?.nome ?? ''"
    :subtitle="colecao ? `Dono: ${colecao.dono?.nome ?? '-'}` : undefined"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #breadcrumb />

    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="ColecoesForm"
      />
    </template>

    <template #details>
      <UIResourceViewFieldGroup :columns="3">
        <UIResourceViewField label="Visibilidade" :value="visibilidadeLabel" />
        <UIResourceViewField
          label="Campus"
          :value="colecao?.campus?.apelido ?? '-'"
        />
        <UIResourceViewField label="Dono" :value="colecao?.dono?.nome" />
      </UIResourceViewFieldGroup>
    </template>

    <template #related>
      <div v-if="colecao" class="u-flex u-flex-col u-gap-6">
        <div class="view-tabs u-flex u-gap-2">
          <button
            type="button"
            class="view-tab-button u-px-4 u-py-2 u-font-semibold u-text-sm"
            :class="
              activeTab === 'acessos'
                ? 'view-tab-button--active'
                : 'view-tab-button--inactive'
            "
            @click="activeTab = 'acessos'"
          >
            Acessos
          </button>
          <button
            type="button"
            class="view-tab-button u-px-4 u-py-2 u-font-semibold u-text-sm"
            :class="
              activeTab === 'acoes'
                ? 'view-tab-button--active'
                : 'view-tab-button--inactive'
            "
            @click="activeTab = 'acoes'"
          >
            Ações
          </button>
        </div>

        <SectionCalendarioColecoesViewAcessos
          v-if="activeTab === 'acessos'"
          :colecao-id="colecao.id"
        />

        <SectionCalendarioColecoesViewAcoes
          v-else
          :colecao-id="colecao.id"
          :dono-atual-nome="colecao.dono?.nome"
          @deleted="handleDeleted"
        />
      </div>
    </template>
  </UIResourceView>
</template>

<style scoped>
.view-tabs {
  border-bottom: 2px solid var(--ladesa-grey-color);
}

.view-tab-button {
  border-bottom: 2px solid transparent;
  margin-bottom: -0.125rem;
}

.view-tab-button--active {
  border-bottom-color: var(--ladesa-green-1-color);
  color: var(--ladesa-green-1-color);
}

.view-tab-button--inactive {
  border-bottom-color: transparent;
  color: var(--ladesa-grey-color);
}
</style>
