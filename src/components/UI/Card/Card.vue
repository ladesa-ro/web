<script setup lang="ts">
//

const _ARBITRARY_UI_CARD_IMAGE_HEIGHT = 180;

//

const $emit = defineEmits(['edit']);

type Props = {
  src: string | null;
  title?: string;
  variant: 'block' | 'inline';
};

const props = defineProps<Props>();

//

const hasImage = computed(() => {
  const src = unref(props.src);
  return src && !src.endsWith('undefined') && !src.endsWith('null');
});

//
</script>

<template>
  <template v-if="variant === 'block'">
    <v-card max-width="100%" :elevation="0" class="card">
      <div
        :style="{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${props.src})`,
        }"
      >
        <v-img
          eager
          contain
          width="100%"
          :src="props.src ?? undefined"
          :height="`${_ARBITRARY_UI_CARD_IMAGE_HEIGHT}px`"
          style="backdrop-filter: blur(10px) brightness(70%)"
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular v-if="Boolean(hasImage)" indeterminate />
              <v-empty-state v-else icon="mdi-cancel" />
            </div>
          </template>

          <template #error>
            <div class="d-flex align-center justify-center fill-height">
              <v-empty-state
                icon="mdi-alert-circle-outline"
                text="Não foi possível buscar esta foto"
              />
            </div>
          </template>
        </v-img>
      </div>

      <div class="textAndButton flex justify-between items-center max-w-full">
        <div class="flex-1 flex-shrink overflow-hidden">
          <v-card-title
            class="font-semibold text-black no-underline inline-block"
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

      <slot />
    </v-card>
  </template>
</template>

<style scoped src="./Card.css"></style>
