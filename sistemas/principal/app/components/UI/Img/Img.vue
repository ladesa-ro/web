<script setup lang="ts">
type Props = {
  src: any;
  alt?: string;
  fallbackBgColor?: string;
};

const {
  src,
  alt,
  fallbackBgColor = 'var(--ladesa-grey-color)',
} = defineProps<Props>();

//

type Slots = {
  fallbackIcon: () => any;
};

defineSlots<Slots>();
</script>

<template>
  <div
    class="overflow-hidden bg-cover bg-center"
    :style="{ backgroundImage: `url(${src})` }"
  >
    <div
      v-if="src"
      class="flex justify-center w-full h-full backdrop-blur-xs backdrop-brightness-75"
    >
      <img :src="src" :alt="alt" class="max-h-full object-contain" />
    </div>

    <!-- fallback -->
    <div
      v-else
      class="w-full h-full flex justify-center items-center"
      :style="{ 'background-color': fallbackBgColor }"
    >
      <!-- fallback icon -->
      <slot name="fallbackIcon">
        <IconsIconImage class="w-1/4 text-ldsa-grey" />
      </slot>
    </div>
  </div>
</template>
