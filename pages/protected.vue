<template>
  <h1>Página Protegida!</h1>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: 'auth' })
</script>