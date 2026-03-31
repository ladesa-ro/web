<script lang="ts" setup>
type Props = {
  title: string;
  subtitle?: string | null;
  imageSrc?: string | null;
  isLoading: boolean;
  isError: boolean;
};

const { title, subtitle, imageSrc, isLoading, isError } = defineProps<Props>();
</script>

<template>
  <UIContainer
    variant="larger"
    class="flex flex-col gap-5 lg:gap-6.5 xl:gap-8"
  >
    <slot name="breadcrumb">
      <UIBreadcrumbDapeBreadcrumb :extra-segment="!isLoading && !isError ? title : null" />
    </slot>

    <template v-if="!isLoading && !isError">

        <UIImg
          v-if="imageSrc !== undefined"
          :src="imageSrc"
          alt=""
          class="shrink-0 w-full h-48 sm:h-56 rounded-lg"
        />

        <div class="flex items-center justify-between gap-4">
          <div class="flex flex-col gap-1">
            <h1 class="text-xl font-semibold lg:text-2xl">{{ title }}</h1>
            <p v-if="subtitle" class="text-sm font-medium text-ldsa-grey">
              {{ subtitle }}
            </p>
          </div>

          <div class="flex shrink-0 items-center gap-2">
            <slot name="header-actions" />
          </div>
        </div>


      <slot name="details" />
      <slot name="related" />
    </template>

    <UILoading v-else-if="isLoading" />

    <span v-else class="text-ldsa-grey">
      Ocorreu um erro inesperado.
    </span>
  </UIContainer>
</template>
