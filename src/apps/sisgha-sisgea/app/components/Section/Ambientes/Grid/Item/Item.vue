<script lang="ts" setup>
import AmbientesForm from '~/components/Section/Ambientes/Form/Form.vue';
import type { AmbienteFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: AmbienteFindOneOutputDto | null;
  link?: string;
  editButton?: boolean;
};

const props = defineProps<Props>();

const { item: ambiente } = props;

const link = props.link === undefined || props.link === '' ? '/sisgea/ambientes' : props.link;

//

const coverImageSrc = useApiImageRoute(
  ApiImageResource.AMBIENTE_COVER,
  ambiente
);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !ambiente">
    <nuxt-link v-if="ambiente" :to="`${link}/${ambiente.id}`">
      <UICard
        :src="coverImageSrc"
        :title="ambiente.nome"
        variant="block"
      >
        <template #actions>
          <DialogModalEditOrCreateModal
            v-if="editButton"
            :edit-id="ambiente.id"
            :form-component="AmbientesForm"
          />
          <IconsArrowAlt
            v-else
            class="w-4.5 rotate-180 mr-1.5 arrow-behaviour transition-transform"
          />
        </template>

        <UICardLine :text="ambiente.bloco.nome" />
        <UICardLine :text="`Capacidade: ${ambiente.capacidade} pessoas`" />
      </UICard>
    </nuxt-link>
  </UICardAutoSkeleton>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

a:hover .arrow-behaviour {
  @apply translate-x-1;
}
</style>
