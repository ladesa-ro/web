<template>
  <div>
    <h1>Página Protegida!</h1>
    <pre><code>{{ JSON.stringify({ data }, null, 2) }}</code></pre>
  </div>
</template>

<script lang="ts" setup>
const { data } = useAuthState();
</script>
