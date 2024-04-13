<template>
  <button @click="openModal">
    <img class="adc" src="~/assets/Bota0-Simples.jpg" alt="" />
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "adicionar",

  methods: {
    openModal() {
      this.$emit("openModal");
    },
  },
};
</script>

<style>
.adc {
  position: absolute;
  margin-left: 1100px;
  margin-top: -65px;
  /*acres*/
}

.adc:hover {
  cursor: pointer;
}
</style>
