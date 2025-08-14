<script setup>
const foase = ref(true);
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppbarStudent class="fixed top-0 right-0 left-0" />

    <main class="flex-1 flex flex-col mt-26 mb-10 overflow-auto">
      <slot />
    </main>

    <UIFooter />
  </div>
</template>
