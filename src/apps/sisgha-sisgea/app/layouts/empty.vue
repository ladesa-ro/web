<template>
  <div class="layout">
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;

  overflow: hidden;

  display: flex;
}

.main {
  flex: 1;

  overflow: auto;

  display: flex;
  flex-direction: column;
}
</style>
