<script lang="ts" setup>
type Props = {
  title?: string;
  variant: 'block' | 'inline';
};

defineProps<Props>();

//

defineEmits(['edit']);

//

const selectedRadio = ref<string>('');
</script>

<template>
  <div
    class="border-ldsa-grey border-2 divide-solid rounded-lg overflow-hidden pb-5 mx-auto max-w-full"
  >
    <div class="textAndButton flex items-center justify-between max-w-full">
      <div
        class="font-semibold text-ldsa-text-default no-underline inline-block max-w-full overflow-hidden"
      >
        <slot class="title" name="title">
          {{ title }}
        </slot>
      </div>

      <v-checkbox
        v-model="selectedRadio"
        class="detail"
        color="success"
        value="success"
      />
    </div>

    <slot />
  </div>
</template>

<style scoped>
.detail {
  position: absolute;
  cursor: pointer;
  z-index: 10;
  margin-left: 83%;
  margin-top: 18%;
  font-size: 1.3rem;
}

.textAndButton {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
