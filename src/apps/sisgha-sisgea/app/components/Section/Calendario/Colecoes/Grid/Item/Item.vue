<script lang="ts" setup>
import type { CalendarioColecaoFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: CalendarioColecaoFindOneOutputDto | null;
};

const props = defineProps<Props>();

const { item: colecao } = toRefs(props);

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

const colecoes = useCalendarioColecao();
const acessosQuery = colecoes.acessos.list(
  computed(() => colecao.value?.id ?? null),
  computed(() => ({ limit: 1 }))
);
const acessosCount = computed(
  () => acessosQuery.data.value?.meta?.totalItems ?? 0
);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !colecao">
    <NuxtLink
      v-if="colecao"
      :to="`/sisgha/dape/calendario/colecoes/${colecao.id}`"
      class="flex flex-col overflow-hidden border-2 border-ldsa-grey rounded-lg hover:brightness-90 hover:bg-ldsa-grey/10"
    >
      <div
        class="h-2 shrink-0"
        :style="{ backgroundColor: colecao.cor || 'var(--ladesa-grey-color)' }"
      />

      <div class="p-4 flex flex-col gap-2">
        <h1 class="font-semibold truncate">{{ colecao.nome }}</h1>

        <div class="flex items-center gap-2 flex-wrap">
          <span
            class="text-xs px-2 py-0.5 rounded-full bg-ldsa-grey/15 text-ldsa-text-default font-medium"
          >
            {{ visibilidadeLabel }}
          </span>

          <span
            v-if="colecao.campus"
            class="text-xs px-2 py-0.5 rounded-full bg-ldsa-grey/15 text-ldsa-text-default font-medium"
          >
            {{ colecao.campus.apelido }}
          </span>
        </div>

        <p class="text-sm text-ldsa-grey">
          {{ acessosCount }} acesso{{ acessosCount === 1 ? '' : 's' }}
          concedido{{ acessosCount === 1 ? '' : 's' }}
        </p>
      </div>
    </NuxtLink>
  </UICardAutoSkeleton>
</template>
