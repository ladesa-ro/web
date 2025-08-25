<script lang="ts" setup>
type Props = {
  positionName: string;
  to: string;
  active: boolean;
};

const { to } = defineProps<Props>();

const pointerdownHandle = () => useRouter().push(to);
</script>

<template>
  <nuxt-link
    :class="{ active }"
    :to="to"
    @click.prevent
    @pointerdown="pointerdownHandle"
    class="flex flex-col justify-end items-center gap-2 w-24 h-28 sm:w-28 sm:h-36 py-7 sm:py-8 border-2 rounded-lg border-ldsa-grey/50 text-center font-semibold max-sm:text-sm"
  >
    <!-- icon -->
    <slot />

    {{ positionName }}
  </nuxt-link>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.active {
  @apply bg-ldsa-green-1 border-ldsa-green-1 text-ldsa-white;
}
</style>
