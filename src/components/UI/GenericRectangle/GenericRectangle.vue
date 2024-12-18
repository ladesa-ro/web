<script setup>
// testar colocar a lógica da estilização de acordo com o horário aqui
</script>

<template>
  <div
    class="flex flex-row items-center justify-between border-2 border-[#118D3B] rounded-lg min-[641px]:px-5 min-[641px]:py-3 max-sm:px-4 max-sm:py-2"
  >
    <section class="flex flex-col justify-between">
      <h1 class="font-semibold">
        <slot name="title">
          Título
        </slot>
      </h1>
      
      <slot name="content">
        <p>Descrição 1</p>
        <p>Descrição 2</p>
      </slot>
    </section>
  </div>
</template>