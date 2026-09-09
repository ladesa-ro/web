<template>
  <div class="u-flex u-flex-col u-overflow-hidden sisgha-consulta-layout">
    <AppbarPublicConsultation />

    <div class="u-flex-1 u-flex u-flex-col sisgha-consulta-layout__body">
      <main
        class="u-flex-1 u-py-10 u-flex u-flex-col sisgha-consulta-layout__main"
      >
        <slot />
      </main>

      <UIFooter />
    </div>
  </div>
</template>

<style scoped>
.sisgha-consulta-layout {
  height: 100vh;
}

.sisgha-consulta-layout__body {
  overflow-y: auto;
}

.sisgha-consulta-layout__main {
  flex-shrink: 1;
}
</style>
