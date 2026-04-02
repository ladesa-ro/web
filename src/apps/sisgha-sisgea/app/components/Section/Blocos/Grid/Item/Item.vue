<script lang="ts" setup>
import BlocosForm from '~/components/Section/Blocos/Form/Form.vue';
import type { BlocoFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: BlocoFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: bloco } = props;

const link = props.link === undefined || props.link === '' ? '/sisgea/blocos' : props.link;

//

const coverImageSrc = useApiImageRoute(ApiImageResource.BLOCO_COVER, bloco);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !bloco">
    <UICard
      v-if="bloco"
      :src="coverImageSrc"
      :title="bloco.nome"
      variant="block"
    >
      <template #actions>
        <UICardActions :to="`${link}/${bloco.id}`">
          <DialogModalEditOrCreateModal :edit-id="bloco.id" :form-component="BlocosForm" />
        </UICardActions>
      </template>

      <UICardLine :text="`${bloco.nome} - ${bloco.codigo}`" />
      <UICardLine :text="bloco.campus.apelido" />
    </UICard>
  </UICardAutoSkeleton>
</template>
