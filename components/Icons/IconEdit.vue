<template>
  <div class="svgEdt" click="$emit('click')">
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.60795 0.85261C9.05107 0.384401 8.21833 0.464505 7.76091 1.03028L0.220295 10.3572C0.0775418 10.54 -2.19431e-07 10.7653 0 10.9972L6.85478e-07 14.5209C8.44257e-07 15.3372 0.743569 15.9514 1.5451 15.7972L5.02812 15.1273C5.27204 15.0804 5.4911 14.9478 5.64566 14.7533L13.1877 5.53785C13.6381 4.98758 13.5626 4.17756 13.0183 3.71996L9.60795 0.85261Z"
        fill="black"
      />
    </svg>
  </div>
</template>

<style scoped>
.svgEdt {
  cursor: pointer;
  position: absolute;
  z-index: 10;
  width: 25px;
  height: 25px;
}
</style>
