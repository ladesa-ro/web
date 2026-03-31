<script lang="ts" setup>
import BlocosForm from '~/components/Section/Blocos/Form/Form.vue';
import type { BlocoFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: BlocoFindOneOutputDto | null;
  link?: string;
  editButton?: boolean;
};

const props = defineProps<Props>();

const { item: bloco } = props;

const link = props.link === undefined || props.link === '' ? '/sisgea/blocos' : props.link;

//

const coverImageSrc = useApiImageRoute(ApiImageResource.BLOCO_COVER, bloco);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !bloco">
    <nuxt-link v-if="bloco" :to="`${link}/${bloco.id}`">
      <UICard
        :src="coverImageSrc"
        :title="bloco.nome"
        variant="block"
      >
        <template #actions>
          <DialogModalEditOrCreateModal
            v-if="editButton"
            :edit-id="bloco.id"
            :form-component="BlocosForm"
          />
          <IconsArrowAlt
            v-else
            class="w-4.5 rotate-180 mr-1.5 arrow-behaviour transition-transform"
          />
        </template>

        <UICardLine :text="`${bloco.nome} - ${bloco.codigo}`" />
        <UICardLine :text="bloco.campus.apelido" />
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
