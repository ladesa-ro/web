<script lang="ts" setup>
import type { UsuarioFindOneResultView } from '@ladesa-ro/api-client-fetch';
import { useQuery } from '@tanstack/vue-query';
import uniq from 'lodash/uniq';
import { ApiImageResource, useApiImageRoute } from '~~/app/integrations';
import IconUser from '~/components/Icons/IconUser.vue';

type Props = {
  usuario: UsuarioFindOneResultView;
};
const props = defineProps<Props>();
const { usuario } = toRefs(props);

//

const apiClient = useApiClient();

const vinculosQuery = useQuery({
  queryKey: [
    'usuarios',
    computed(() => `usuario::id::${unref(usuario.value.id)}`),
    'usuarios::vinculos',
  ],
  queryFn: () => {
    return apiClient.perfis.perfilList({
      filterUsuarioId: [usuario.value.id],
      filterAtivo: ['true'],
    });
  },
});

await vinculosQuery.suspense();

const vinculosResponse = computed(() => vinculosQuery.data.value);
const vinculos = computed(() => vinculosResponse.value?.data ?? []);

const getRoleLabel = (role: string) => {
  switch (role.toLowerCase()) {
    case 'dape': {
      return 'DAPE';
    }

    case 'professor': {
      return 'Professor';
    }

    default: {
      return role;
    }
  }
};

const vinculosConcatenated = computed(() => {
  const allVinculosLabels = vinculos.value.map((vinculo) =>
    getRoleLabel(vinculo.cargo)
  );

  const uniqueVinculosLabels = uniq(allVinculosLabels);

  return uniqueVinculosLabels.join(' e ');
});

const handleCardClick = (e: MouseEvent) => {
  const target = <HTMLElement>e.target;

  if (target && target.closest('[data-grid-item-no-redirect]')) {
    e.preventDefault();
  }
};

const profilePicureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  usuario
);
</script>

<template>
  <nuxt-link
    @click.capture="handleCardClick"
    :to="`/sisgha/dape/usuarios/${usuario.id}`"
    >
    <UICard
      v-if="usuario"
      :title="usuario.nome"
      variant="block"
      :src="profilePicureUrl"
      :fallback-icon="IconUser"
    >
      <template #actions>
        <SectionUsuariosModalsForm :editId="usuario.id" />
      </template>

      <UICardLine v-if="vinculos.length === 0" text="Sem vínculos" />
      <UICardLine v-else :text="vinculosConcatenated" />
    </UICard>
  </nuxt-link>
</template>
