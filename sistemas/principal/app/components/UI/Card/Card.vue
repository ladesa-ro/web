<script setup lang="ts">
type Props = {
  variant: 'block' | 'inline';
  title?: string;
  src: string | null;
};

const { src, variant, title } = defineProps<Props>();

//

const $emit = defineEmits(['edit']);
</script>

<template>
  <template v-if="variant === 'block'">
    <div class="card-layout">
      <UIImg
        :src="src"
        class="h-[11rem]"
        fallbackBgColor="rgb(from var(--ladesa-grey-color) R G B / 30%)"
      >
        <template #fallbackIcon>
          <slot name="fallbackIcon" />
        </template>
      </UIImg>

      <main class="p-3 pl-4">
        <!-- title and actions -->
        <section class="title-and-actions">
          <h1 class="title">
            <slot name="title">{{ title }}</slot>
          </h1>

          <!-- this .stop.prevent prevents scenarios that the click on the father takes to another page, for example -->
          <div class="shrink-0" @click.stop.prevent="() => {}">
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
