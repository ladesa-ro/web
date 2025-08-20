<script lang="ts" setup>
const { to } = defineProps<{
  to?: string;
  icon: any;
  title: string;
}>();

const pointerdownHandle = () => {
  if (to) useRouter().push(to);
};
</script>

<template>
  <NuxtLink
    @click.prevent
    @pointerdown="pointerdownHandle"
    :to="to"
    class="bg-ldsa-green-1/5 border border-ldsa-green-1/50 rounded-md p-6 flex flex-col items-center hover:brightness-110 hover:shadow-lg/5 hover:scale-102 transition-[background-color,scale,shadow,filter] duration-200 cursor-pointer"
  >
    <component :is="icon" class="w-16 h-16 mb-4 text-ldsa-text-green" />

    <span class="text-ldsa-text-green text-[0.938rem] font-bold">
      {{ title }}
    </span>
  </NuxtLink>
</template>
