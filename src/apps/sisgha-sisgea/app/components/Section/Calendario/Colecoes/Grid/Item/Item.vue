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
      class="colecoes-grid-item u-flex u-flex-col u-overflow-hidden u-rounded-lg"
    >
      <div
        class="colecoes-grid-item__color-bar u-shrink-0"
        :style="{ backgroundColor: colecao.cor || 'var(--ladesa-grey-color)' }"
      />

      <div class="u-p-4 u-flex u-flex-col u-gap-2">
        <h1 class="u-font-semibold u-truncate">{{ colecao.nome }}</h1>

        <div class="u-flex u-items-center u-gap-2 u-flex-wrap">
          <UIBadge>{{ visibilidadeLabel }}</UIBadge>

          <UIBadge v-if="colecao.campus">
            {{ colecao.campus.apelido }}
          </UIBadge>
        </div>

        <p class="colecoes-grid-item__meta u-text-sm">
          {{ acessosCount }} acesso{{ acessosCount === 1 ? '' : 's' }}
          concedido{{ acessosCount === 1 ? '' : 's' }}
        </p>
      </div>
    </NuxtLink>
  </UICardAutoSkeleton>
</template>

<style scoped>
.colecoes-grid-item {
  border: 2px solid var(--ladesa-grey-color);
  transition:
    filter var(--ui-duration-base) var(--ui-easing-standard),
    background-color var(--ui-duration-base) var(--ui-easing-standard);
}

.colecoes-grid-item:hover {
  filter: brightness(0.9);
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.colecoes-grid-item__color-bar {
  height: 0.5rem;
}

.colecoes-grid-item__meta {
  color: var(--ladesa-grey-color);
}
</style>
