<script lang="ts" setup>
import Card from './Card.vue';
import View from './View.vue';
import { STATUS_TABS, type StatusSolicitacao } from './-Helpers/format';

const solicitacoes = useCalendarioSolicitacaoMudanca();

const status = ref<StatusSolicitacao>('ABERTA');

const queryParams = computed(() => ({
  'filter.status': [status.value],
  limit: 50,
}));

const { data: result, isLoading, isError } = solicitacoes.list(queryParams);

const lista = computed(() => result.value?.data ?? []);

const openId = ref<string | null>(null);

function openDetail(id: string) {
  openId.value = id;
}

function closeDetail() {
  openId.value = null;
}
</script>

<template>
  <UIContainer class="u-flex u-flex-col u-gap-6">
    <UIBreadcrumbDapeBreadcrumb />

    <UIToggle v-model="status" :items="STATUS_TABS" class="u-w-full" />

    <div v-if="isLoading" class="u-text-center u-py-8 solicitacoes-mudanca__status">
      Carregando...
    </div>

    <div v-else-if="isError" class="u-text-center u-py-8 solicitacoes-mudanca__status--error">
      Erro ao carregar solicitações. Tente novamente.
    </div>

    <UIEmptyState
      v-else-if="lista.length === 0"
      description="Nenhuma solicitação encontrada."
    />

    <div v-else class="u-grid u-gap-4 solicitacoes-mudanca__grid">
      <Card
        v-for="solicitacao in lista"
        :key="solicitacao.id"
        :solicitacao="solicitacao"
        @open="openDetail"
      />
    </div>

    <DialogSkeleton
      :model-value="!!openId"
      @update:model-value="!$event && closeDetail()"
    >
      <View v-if="openId" :solicitacao-id="openId" @close="closeDetail" />
    </DialogSkeleton>
  </UIContainer>
</template>

<style scoped>
.solicitacoes-mudanca__status {
  color: var(--ladesa-grey-color);
}

.solicitacoes-mudanca__status--error {
  color: var(--ladesa-red-color);
}

.solicitacoes-mudanca__grid {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 1024px) {
  .solicitacoes-mudanca__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
