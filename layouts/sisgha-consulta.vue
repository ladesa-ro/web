<template>
  <div class="layout">
    <main class="main">
      <div class="flex-1 flex">
        <slot></slot>
      </div>
      <div>
        <UIFooter />
      </div>
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
