<script lang="ts" setup>
import CampusForm from '../../Form/Form.vue';
import type { CampusFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: CampusFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: campus } = toRefs(props);

const link = props.link === undefined || props.link === '' ? '/sisgea/campus' : props.link;
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !campus">
    <UICard
      v-if="campus"
      :src="null"
      :title="campus.apelido"
      variant="block"
    >
      <template #actions>
        <UICardActions :to="`${link}/${campus.id}`">
          <DialogModalEditOrCreateModal :edit-id="campus.id" :form-component="CampusForm" />
        </UICardActions>
      </template>

      <UICardLine :text="`Nome: ${campus.nomeFantasia}`" />
      <UICardLine :text="`CNPJ: ${campus.cnpj}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
