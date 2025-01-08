<template>
  <div class="border-card p-5">
    <span class="section-title">
      <span class="icon"> <!-- element used for apply class to slot content -->
        <slot name="icon"/>
      </span>
      <slot name="title" />
    </span>

    <slot />
  </div>
</template>

<style scoped>
.section-title {
  @apply flex items-center gap-[0.625rem];
  @apply mb-5 font-[600];
}

.icon {
  @apply w-[1.375rem] h-[1.375rem];
}
</style>