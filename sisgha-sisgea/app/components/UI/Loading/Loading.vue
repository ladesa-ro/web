<template>
  <div class="progress-container">
    <VProgressCircular :size="50" :width="4" indeterminate />
  </div>
</template>

<style scoped>
.progress-container {
  flex: 1;

  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
