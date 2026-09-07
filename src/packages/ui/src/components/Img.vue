<script lang="ts" setup>
import IconImage from '../icons/Image.vue';

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
  <div class="ui-img" :style="{ backgroundImage: `url(${src})` }">
    <div v-if="src" class="ui-img__content">
      <img :alt="alt" :src="src" class="ui-img__image" />
    </div>

    <div v-else class="ui-img__fallback" :style="{ 'background-color': fallbackBgColor }">
      <slot name="fallbackIcon">
        <IconImage class="ui-img__fallback-icon" />
      </slot>
    </div>
  </div>
</template>
