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
  <UIContainer class="flex flex-col gap-6">
    <UIBreadcrumbDapeBreadcrumb />

    <UIToggle v-model="status" :items="STATUS_TABS" class="w-full" />

    <div v-if="isLoading" class="text-center text-ldsa-grey py-8">
      Carregando...
    </div>

    <div v-else-if="isError" class="text-center text-ldsa-red py-8">
      Erro ao carregar solicitações. Tente novamente.
    </div>

    <div
      v-else-if="lista.length === 0"
      class="flex flex-col justify-center items-center gap-5 py-8"
    >
      <UIContentStateEmpty class="dark:saturate-75 dark:opacity-50" />
      <span class="text-ldsa-grey dark:contrast-0 text-center">
        Nenhuma solicitação encontrada.
      </span>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
