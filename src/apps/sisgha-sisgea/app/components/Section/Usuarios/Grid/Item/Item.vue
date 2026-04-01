<script lang="ts" setup>
import type { UsuarioFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { CargoLabels, type CargoType } from '~/components/Section/Usuarios/Form/FormUtils';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  usuario: UsuarioFindOneOutputDto;
  link?: string;
  editButton?: boolean;
};
const { usuario, link: linkProps, editButton = true } = defineProps<Props>();

const link = linkProps === undefined || linkProps === '' ? 'usuarios' : linkProps;

const vinculos = computed(() => usuario.vinculos ?? []);

const vinculosConcatenated = computed(() => {
  const labels = [...new Set(vinculos.value.map((v: any) => CargoLabels[v.cargo as CargoType] ?? v.cargo))];
  return labels.join(' e ');
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
    <UICard :src="profilePicureUrl" :title="usuario.nome ?? ''" variant="block">
      <template #fallbackIcon>
        <IconsUser class="w-1/3 2xl:w-1/4 text-ldsa-grey" />
      </template>

      <template #actions>
        <SectionUsuariosModalsForm v-if="editButton" :edit-id="usuario.id" />
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
