<script setup lang="ts">
import IconImage from '~/components/Icons/IconImage.vue';

type Props = {
  src: string | null;
  variant: 'block' | 'inline';
  title?: string;
  fallbackIcon?: Component | (HTMLElement & SVGElement);
};

const { src, variant, title, fallbackIcon = IconImage } = defineProps<Props>();

//

const $emit = defineEmits(['edit']);
</script>

<template>
  <template v-if="variant === 'block'">
    <div class="card-layout">
      <!-- card image -->
      <section class="card-img" :style="{ backgroundImage: `url(${src})` }">
        <div v-if="src" class="img-backdrop">
          <img :src="src" class="max-h-full" />
        </div>

        <div v-else class="fallback-img">
          <fallbackIcon class="fallback-icon" />
        </div>
      </section>

      <main class="p-3 pl-4">
        <!-- title and actions -->
        <section class="title-and-actions">
          <h1 class="title">
            <slot name="title">{{ title }}</slot>
          </h1>

          <div class="shrink-0">
            <slot name="actions" />
          </div>
        </section>

        <!-- description -->
        <div class="description">
          <slot />
        </div>
      </main>
    </div>
  </template>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.card-layout {
  @apply rounded-lg border-2 border-ldsa-grey overflow-hidden;
}

/* -- image -- */

.card-img {
  @apply h-[11rem] bg-cover bg-center;
}

.img-backdrop {
  @apply h-full flex items-center justify-center backdrop-blur-xs	backdrop-brightness-75;
}

.fallback-img {
  @apply w-full h-full bg-ldsa-grey/30 flex justify-center items-center;
}

.fallback-icon {
  @apply w-20 text-ldsa-grey opacity-75;
}

/* ----------- */

.title-and-actions {
  @apply w-full flex justify-between items-center mb-1;
}

.title {
  @apply text-[1.063rem] font-semibold truncate;
}

.description {
  @apply flex flex-col text-sm font-medium text-ldsa-grey;
}
</style>
