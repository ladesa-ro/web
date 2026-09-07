<script setup lang="ts">
import { Button } from '@ladesa-ro/web.ui';

definePageMeta({ auth: false });
</script>

<template>
  <div style="padding: 2rem; display: flex; flex-direction: column; gap: 2rem">
    <section>
      <h2>Button</h2>
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
        <Button>Padrão</Button>
        <Button :outline-on-click="false">Sem outline</Button>
        <Button disabled>Desabilitado</Button>
      </div>
    </section>
  </div>
</template>
