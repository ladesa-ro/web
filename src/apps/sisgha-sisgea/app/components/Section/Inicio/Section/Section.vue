<script lang="ts" setup>
defineProps<{ title: string }>();
</script>

<template>
  <section class="border-t border-t-ldsa-grey flex flex-col gap-4 pt-8 pb-9">
    <h2 class="text-lg font-medium leading-4">{{ title }}</h2>
    <div
      class="flex-1 grid max-[500px]:grid-cols-1 min-[501px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
    >
      <slot />
    </div>
  </section>
</template>
