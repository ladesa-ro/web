<script setup></script>

<template>
  <div class="button_add" click="$emit('click')">
    <svg
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="47" height="47" rx="8" fill="#118D3B" />
      <path
        d="M23.5336 32L23.5 23.5M23.5 23.5L23.4664 15M23.5 23.5L32 23.5336M23.5 23.5L15 23.4664"
        stroke="white"
        stroke-width="3.04756"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style>
.button_add {
  width: 50px;
  margin-left: 94%;
  margin-top: -3%;
  cursor: pointer;
}
</style>
