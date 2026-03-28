<script lang="ts" setup>
type Props = { title?: string };
defineProps<Props>();
</script>

<template>
  <div class="card max-w-full flex items-center">
    <div class="flex-1 w-full mt-2 mb-3 ml-2">
      <h1 class="font-semibold pt-0 max-w-full overflow-hidden">
        <slot name="title">
          {{ title }}
        </slot>
      </h1>

      <slot />
    </div>

    <div class="mr-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.card {
  @apply border-2 border-ldsa-grey;
  @apply rounded-lg overflow-hidden;
}
</style>
