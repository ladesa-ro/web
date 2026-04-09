<script lang="ts" setup>
import type { Component } from 'vue';

type Props = {
  isLoading?: boolean;
  item?: { id: string } | null;
  src?: string | null;
  title?: string | null;
  link: string;
  formComponent: Component;
  formProps?: Record<string, any> | null;
};

const props = defineProps<Props>();
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !item">
    <UICard
      v-if="item"
      :src="src ?? null"
      :title="title ?? null"
      variant="block"
    >
      <template #actions>
        <UICardActions :to="`${link}/${item.id}`">
          <DialogModalEditOrCreateModal
            :edit-id="item.id"
            :form-component="formComponent"
            :form-props="formProps"
          />
        </UICardActions>
      </template>

      <slot />
    </UICard>
  </UICardAutoSkeleton>
</template>
