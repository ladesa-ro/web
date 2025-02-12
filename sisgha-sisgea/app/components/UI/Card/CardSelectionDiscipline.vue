<script lang="ts" setup>
const $emit = defineEmits(['edit']);

type Props = {
  title?: string;
  variant: 'block' | 'inline';
};

const props = defineProps<Props>();
</script>

<template>
  <v-card :elevation="0" class="card" max-width="100%">
    <div class="flex items-center h-full">
      <div class="flex-1 w-full mt-2 mb-3">
        <v-card-title class="font-semibold pt-0 max-w-[100%] overflow-hidden">
          <slot class="title" name="title">
            {{ props.title }}
          </slot>
        </v-card-title>

        <slot />
      </div>

      <div class="mr-2">
        <slot name="actions" />
      </div>
    </div>
  </v-card>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.card {
  @apply border-2 border-ldsa-grey;
  @apply rounded-lg overflow-hidden;
}
</style>
