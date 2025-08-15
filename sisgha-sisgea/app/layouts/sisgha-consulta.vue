<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <AppbarStudent />

    <div class="flex-1 overflow-y-auto flex flex-col">
      <main class="flex-1 py-10 shrink flex flex-col">
        <slot />
      </main>

      <UIFooter />
    </div>
  </div>
</template>
