<script lang="ts" setup>
import Img from './Img.vue';

type Props = {
  variant: 'block';
  src: string | null;
  title: string | null;
};

defineProps<Props>();
</script>

<template>
  <div class="ui-card">
    <Img
      :src="src"
      class="ui-card__image"
      fallback-bg-color="rgb(from var(--ladesa-grey-color) R G B / 30%)"
    >
      <template #fallbackIcon>
        <slot name="fallbackIcon" />
      </template>
    </Img>

    <main class="ui-card__body">
      <section class="ui-card__header">
        <h1 class="ui-card__title">
          <slot name="title">{{ title ?? '-' }}</slot>
        </h1>

        <div class="ui-card__actions" @click.stop.prevent="() => {}">
          <slot name="actions" />
        </div>
      </section>

      <div class="ui-card__description">
        <slot />
      </div>
    </main>
  </div>
</template>
