<script setup lang="ts">
type Props = {
  title?: string;
  variant: 'block' | 'inline';
};

const props = defineProps<Props>();

//

const $emit = defineEmits(['edit']);

//

const selectedRadio = ref<string>('');
</script>

<template>
  <v-card
    max-width="100%"
    class="-card-bloco border-2 divide-solid border-lime-500 rounded-lg overflow-hidden pb-5 mx-auto"
  >
    <div class="textAndButton flex items-center justify-between max-w-full">
      <v-card-title
        class="-card-titulo font-semibold text-black no-underline inline-block max-w-[100%] overflow-hidden"
      >
        <slot name="title" class="title">
          {{ props.title }}
        </slot>
      </v-card-title>

      <v-checkbox
        v-model="selectedRadio"
        color="success"
        value="success"
        class="detail"
      />
    </div>

    <slot />
  </v-card>
</template>

<style scoped>
.-card-bloco {
  border: 2px solid #9ab69e;
}
.detail {
  position: absolute;
  cursor: pointer;
  z-index: 10;
  margin-left: 83%;
  margin-top: 18%;
  font-size: 1.3rem;
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
