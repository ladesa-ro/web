<script lang="ts" setup>
import type { Ladesa_ManagementService_Domain_Contracts_UsuarioFindOneOutput as UsuarioFindOneOutput } from '@ladesa-ro/management-service-client';
import { useQuery } from '@tanstack/vue-query';
import uniq from 'lodash/uniq';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  usuario: UsuarioFindOneOutput;
  link?: string;
  editButton?: boolean;
};
const { usuario, link: linkProps, editButton = true } = defineProps<Props>();

let link = linkProps === undefined || linkProps === '' ? 'usuarios' : linkProps;

// TODO: adicionar lógica para deixar o link mais dinâmico

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
  <nuxt-link
    v-if="usuario"
    :to="link + `/${usuario.id}`"
    @click.capture="handleCardClick"
  >
    <UICard :src="profilePicureUrl" :title="usuario.nome" variant="block">
      <template #fallbackIcon>
        <IconsUser class="w-1/3 2xl:w-1/4 text-ldsa-grey" />
      </template>

      <template #actions>
        <SectionUsuariosModalsForm
          v-if="editButton"
          :editId="usuario.id"
        />
        <IconsArrowAlt
          v-else
          class="w-4.5 rotate-180 mr-1 arrow-behaviour transition-transform"
        />
      </template>

      <UICardLine v-if="vinculos.length === 0" text="Sem vínculos" />
      <UICardLine v-else :text="vinculosConcatenated" />
    </UICard>
  </nuxt-link>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

a:hover .arrow-behaviour {
  @apply translate-x-1;
}
</style>
