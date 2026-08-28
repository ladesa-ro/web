<script lang="ts" setup>
import type { HorarioEdicaoDiferencaEntradaOutputRestDto } from '@ladesa-ro/web.api.client';

const props = defineProps<{
  titulo: string;
  cor: 'green-2' | 'red' | 'yellow';
  itens: HorarioEdicaoDiferencaEntradaOutputRestDto[];
  modo: 'entram' | 'saem' | 'mudam';
}>();

const style = computed(() => ({
  '--color': `rgb(from var(--ladesa-${props.cor}-color) R G B / 1)`,
}));
</script>

<template>
  <section v-if="itens.length > 0" class="flex flex-col gap-3">
    <h2
      :style="style"
      class="flex items-center gap-2 font-semibold text-ldsa-text-default"
    >
      <span class="w-2.5 h-2.5 rounded-full bg-(--color)" />
      {{ titulo }}
      <span class="text-sm font-normal text-ldsa-grey">({{ itens.length }})</span>
    </h2>

    <ul class="flex flex-col gap-2">
      <SectionHorarioDapeSessaoMudancaItem
        v-for="(item, index) in itens"
        :key="index"
        :entrada="item"
        :modo="modo"
      />
    </ul>
  </section>
</template>
