<script lang="ts" setup>
type Props = {
  variant: 'block' | 'inline';
  src: string | null;
  title: string | null;
};

const { src, variant, title } = defineProps<Props>();

//

const $emit = defineEmits(['edit']);
</script>

<template>
  <template v-if="variant === 'block'">
    <!-- card layout -->
    <div class="rounded-lg border-2 border-ldsa-grey overflow-hidden">
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
        <section class="w-full flex justify-between items-center mb-1">
          <!-- title -->
          <h1 class="text-[1.063rem] font-semibold truncate">
            <slot name="title">{{ title ?? '-' }}</slot>
          </h1>

          <!-- this .stop.prevent prevents scenarios that the click on the father takes to another page, for example -->
          <div class="shrink-0" @click.stop.prevent="() => {}">
            <slot name="actions" />
          </div>
        </section>

        <!-- description -->
        <div class="flex flex-col text-sm font-medium text-ldsa-grey">
          <slot />
        </div>
      </main>
    </div>
  </template>
</template>
