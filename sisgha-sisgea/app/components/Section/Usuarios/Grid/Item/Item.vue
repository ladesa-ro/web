<script lang="ts" setup>
import type { UsuarioFindOneResultView } from '@ladesa-ro/api-client-fetch';
import { useQuery } from '@tanstack/vue-query';
import uniq from 'lodash/uniq';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  usuario: UsuarioFindOneResultView;
  link?: string;
};
const { usuario, link: linkProps } = defineProps<Props>();

let link =
  linkProps === undefined || linkProps === ''
    ? `usuarios/${usuario.id}`
    : linkProps;

//

const { data: vinculosResponse } = useQuery({
  queryKey: [
    'usuarios',
    computed(() => `usuario::id::${unref(usuario.id)}`),
    'usuarios::vinculos',
  ],
  queryFn: () => {
    return useApiClient().perfis.perfilList({
      filterUsuarioId: [usuario.id],
      filterAtivo: ['true'],
    });
  },
});

const vinculos = computed(() => vinculosResponse.value?.data ?? []);

//

const getRoleLabel = (role: string) => {
  switch (role.toLowerCase()) {
    case 'dape':
      return 'DAPE';
    case 'professor':
      return 'Professor';
    default:
      return role;
  }
};

const vinculosConcatenated = computed(() => {
  const allVinculosLabels = vinculos.value.map(vinculo =>
    getRoleLabel(vinculo.cargo)
  );

  const uniqueVinculosLabels = uniq(allVinculosLabels);

  return uniqueVinculosLabels.join(' e ');
});

//

const handleCardClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;

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
  <nuxt-link v-if="usuario" :to="link" @click.capture="handleCardClick">
    <UICard :src="profilePicureUrl" :title="usuario.nome" variant="block">
      <template #fallbackIcon>
        <IconsIconUser class="w-1/3 2xl:w-1/4 text-ldsa-grey" />
      </template>

      <template #actions>
        <SectionUsuariosModalsForm
          v-if="link === `usuarios/${usuario.id}`"
          :editId="usuario.id"
        />
        <IconsArrowIconArrowAlt v-else class="w-5 rotate-180 mr-1" />
      </template>

      <UICardLine v-if="vinculos.length === 0" text="Sem vínculos" />
      <UICardLine v-else :text="vinculosConcatenated" />
    </UICard>
  </nuxt-link>
</template>
