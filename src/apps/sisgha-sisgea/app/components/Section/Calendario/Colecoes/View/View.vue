<script lang="ts" setup>
import ColecoesForm from '../Form/Form.vue';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const router = useRouter();
const colecoes = useCalendarioColecao();

const {
  data: colecao,
  isLoading,
  isError,
} = colecoes.findOne(ref(resourceId));

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
      <div v-if="colecao" class="flex flex-col gap-6">
        <div class="flex gap-2 border-b-2 border-ldsa-grey">
          <button
            type="button"
            class="px-4 py-2 font-semibold text-sm border-b-2 -mb-0.5"
            :class="
              activeTab === 'acessos'
                ? 'border-ldsa-green-1 text-ldsa-green-1'
                : 'border-transparent text-ldsa-grey'
            "
            @click="activeTab = 'acessos'"
          >
            Acessos
          </button>
          <button
            type="button"
            class="px-4 py-2 font-semibold text-sm border-b-2 -mb-0.5"
            :class="
              activeTab === 'acoes'
                ? 'border-ldsa-green-1 text-ldsa-green-1'
                : 'border-transparent text-ldsa-grey'
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
