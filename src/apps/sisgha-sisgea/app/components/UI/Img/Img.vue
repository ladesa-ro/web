<script lang="ts" setup>
type Props = {
  src: any;
  alt?: string;
  fallbackBgColor?: string;
};

const {
  src,
  alt,
  fallbackBgColor = 'rgb(from var(--ladesa-grey-color) R G B / 30%)',
} = defineProps<Props>();

//

type Slots = {
  fallbackIcon: () => any;
};

defineSlots<Slots>();
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${src})` }"
    class="overflow-hidden bg-cover bg-center"
  >
    <div
      v-if="src"
      class="flex justify-center w-full h-full backdrop-blur-xs backdrop-brightness-75"
    >
      <img :alt="alt" :src="src" class="max-h-full object-contain" />
    </div>

    <!-- fallback -->
    <div
      v-else
      :style="{ 'background-color': fallbackBgColor }"
      class="w-full h-full flex justify-center items-center"
    >
      <!-- fallback icon -->
      <slot name="fallbackIcon">
        <IconsImage class="w-1/4 text-ldsa-grey" />
      </slot>
    </div>
  </div>
</template>
