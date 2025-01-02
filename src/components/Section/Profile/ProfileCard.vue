<template>
  <div class="border-card"> <!--class provided by parent-->
    <span class="title">
      <slot name="icon" />
      <slot name="title" />
    </span>

    <slot />
  </div>
</template>

<style scoped>
.title {
  @apply flex flex-row items-center gap-[0.625rem];
  @apply mb-6 p-5 pb-0 font-[600];
}
</style>