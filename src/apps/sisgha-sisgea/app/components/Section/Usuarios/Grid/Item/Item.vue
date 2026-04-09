<script lang="ts" setup>
import type { UsuarioFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { CargoLabels, type CargoType } from '~/utils/constants';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  isLoading?: boolean;
  usuario?: UsuarioFindOneOutputDto | null;
  link?: string;
};
const { usuario, link: linkProps } = defineProps<Props>();

const link =
  linkProps === undefined || linkProps === '' ? 'usuarios' : linkProps;

const vinculos = computed(() => usuario?.vinculos ?? []);

const vinculosConcatenated = computed(() => {
  const labels = [
    ...new Set(
      vinculos.value.map(
        (v: any) => CargoLabels[v.cargo as CargoType] ?? v.cargo
      )
    ),
  ];
  return labels.join(' e ');
});

//

const profilePicureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  usuario
);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !usuario">
    <UICard
      v-if="usuario"
      :src="profilePicureUrl"
      :title="usuario.nome ?? ''"
      variant="block"
    >
      <template #fallbackIcon>
        <IconsUser class="w-1/3 2xl:w-1/4 text-ldsa-grey" />
      </template>

      <template #actions>
        <UICardActions :to="link + `/${usuario.id}`">
          <SectionUsuariosModalsForm :edit-id="usuario.id" />
        </UICardActions>
      </template>

      <UICardLine v-if="vinculos.length === 0" text="Sem vínculos" />
      <UICardLine v-else :text="vinculosConcatenated" />
    </UICard>
  </UICardAutoSkeleton>
</template>
