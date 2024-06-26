<script setup lang="ts">
const $emit = defineEmits(['edit']);

type Props = {
  title?: string;
  variant: 'block' | 'inline';
};

const props = defineProps<Props>();
</script>

<template>
  <v-card
    max-width="100%"
    class="-card-bloco border-2 divide-solid border-lime-500 rounded-lg overflow-hidden pb-5 mx-auto"
  >
    <div class="textAndButton flex items-center justify-between max-w-full">
      <v-card-title
        class="-card-titulo font-semibold text-black no-underline inline-block max-w-[90%] overflow-hidden"
      >
        <slot name="title">
          {{ props.title }}
        </slot>
      </v-card-title>

      <v-radio class="detail"></v-radio>
    </div>

    <slot></slot>
  </v-card>
</template>

<style scoped>
.-card-bloco {
  border: 2px solid #9ab69e;
}
.detail {
  cursor: pointer;
  margin-left: auto; /* Empurra o rádio botão para a direita */
}
.-card-titulo {
  font-weight: 600;
}
.textAndButton {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
