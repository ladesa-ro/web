<script lang="ts" setup>
import Container from './Container.vue';
import Img from './Img.vue';
import Loading from './Loading.vue';

export type ResourceViewProps = {
  title: string;
  subtitle?: string | null;
  imageSrc?: string | null;
  isLoading: boolean;
  isError: boolean;
};

defineProps<ResourceViewProps>();
</script>

<template>
  <Container variant="larger" class="ui-resource-view">
    <slot name="breadcrumb" />

    <template v-if="!isLoading && !isError">
      <Img
        v-if="imageSrc !== undefined"
        :src="imageSrc"
        alt=""
        class="ui-resource-view__image"
      />

      <div class="ui-resource-view__header">
        <div class="ui-resource-view__heading">
          <h1 class="ui-resource-view__title">{{ title }}</h1>
          <p v-if="subtitle" class="ui-resource-view__subtitle">
            {{ subtitle }}
          </p>
        </div>

        <div class="ui-resource-view__actions">
          <slot name="header-actions" />
        </div>
      </div>

      <slot name="details" />
      <slot name="related" />
    </template>

    <Loading v-else-if="isLoading" />

    <span v-else class="ui-resource-view__error">
      Ocorreu um erro inesperado.
    </span>
  </Container>
</template>
