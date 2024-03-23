<template>
  <v-autocomplete
  label="Autocomplete"
  variant="outlined"
  />
</template>

<script lang="ts" setup>

import { defineProps } from 'vue';



defineProps({
  listItems: Array,
});

</script>



<style>

</style>
