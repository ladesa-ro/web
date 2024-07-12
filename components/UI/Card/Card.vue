<script setup lang="ts">
const $emit = defineEmits(['edit']);

type Props = {
  title?: string;
  src: string | null;
  variant: 'block' | 'inline';
};

const props = defineProps<Props>();

const height = 180;
</script>

<template>
  <v-card max-width="100%" :elevation="1" class="card">
    <div
      :style="{
        backgroundSize: 'cover',
        backgroundImage: `url(${props.src})`,
      }"
    >
      <v-img
        eager
        contain
        width="100%"
        :height="`${height}px`"
        :src="props.src ?? undefined"
        style="backdrop-filter: blur(10px) brightness(70%)"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular indeterminate />
          </div>
        </template>
      </v-img>
    </div>

    <div class="textAndButton flex justify-between items-center max-w-full">
      <div class="flex-1 flex-shrink overflow-hidden">
        <v-card-title
          class="-card-titulo font-semibold text-black no-underline inline-block"
        >
          <slot name="title">
            {{ props.title }}
          </slot>
        </v-card-title>
      </div>
      <div class="flex-shrink-0 mr-3">
        <slot name="actions">
          <UIButtonEdit @click="$emit('edit')" />
        </slot>
      </div>
    </div>

    <slot></slot>
  </v-card>
</template>

<style scoped src="./Card.css"></style>

<style scoped>
.-card-titulo {
  font-weight: 600;
}
</style>
