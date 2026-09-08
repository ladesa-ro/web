<script lang="ts" setup>
import type { Component } from 'vue';
import Card from './Card.vue';
import CardActions from './CardActions.vue';
import CardAutoSkeleton from './CardAutoSkeleton.vue';
import EditOrCreateModal from './EditOrCreateModal.vue';

export type GenericCrudItemProps = {
  isLoading?: boolean;
  item?: { id: string } | null;
  src?: string | null;
  title?: string | null;
  link: string;
  formComponent: Component;
  formProps?: { [key: string]: unknown } | null;
  as?: string | Component;
};

defineProps<GenericCrudItemProps>();
</script>

<template>
  <CardAutoSkeleton :skeleton="isLoading || !item">
    <Card v-if="item" :src="src ?? null" :title="title ?? null" variant="block">
      <template #actions>
        <CardActions :to="`${link}/${item.id}`" :as="as">
          <EditOrCreateModal
            :edit-id="item.id"
            :form-component="formComponent"
            :form-props="formProps"
          />
        </CardActions>
      </template>

      <slot />
    </Card>
  </CardAutoSkeleton>
</template>
