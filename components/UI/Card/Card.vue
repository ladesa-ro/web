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
  <v-card
    max-width="100%"
    class="-card-bloco border-2 divide-solid border-lime-500 rounded-lg overflow-hidden pb-5 mx-auto"
  >
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
      <v-card-title
        class="-card-titulo font-semibold text-black no-underline inline-block max-w-[90%] overflow-hidden"
      >
        <slot name="title">
          {{ props.title }}
        </slot>
      </v-card-title>

      <slot name="actions">
        <IconsIconEdit @click="$emit('edit')" class="detail" />
      </slot>
    </div>

    <slot></slot>
  </v-card>
</template>

<style scoped>
.-card-bloco {
  /* adicionado borda. */
  border: 2px solid #9ab69e;
}
.detail {
  cursor: pointer;
  z-index: 10;
  margin-right: 10px;
}
.-card-titulo {
  font-weight: 600;
}
</style>
