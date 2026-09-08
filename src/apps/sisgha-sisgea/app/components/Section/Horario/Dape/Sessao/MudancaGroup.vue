<script lang="ts" setup>
import type { HorarioEdicaoDiferencaEntradaOutputRestDto } from '@ladesa-ro/web.api.client';

const props = defineProps<{
  titulo: string;
  cor: 'green-2' | 'red' | 'yellow';
  itens: HorarioEdicaoDiferencaEntradaOutputRestDto[];
  modo: 'entram' | 'saem' | 'mudam';
  sessaoId: string;
}>();

const emit = defineEmits<{ desfeito: [] }>();

const style = computed(() => ({
  '--color': `rgb(from var(--ladesa-${props.cor}-color) R G B / 1)`,
}));
</script>

<template>
  <section v-if="itens.length > 0" class="u-flex u-flex-col u-gap-3">
    <h2
      :style="style"
      class="mudanca-group__title u-flex u-items-center u-gap-2 u-font-semibold"
    >
      <span class="mudanca-group__dot u-rounded-full" />
      {{ titulo }}
      <span class="mudanca-group__count u-text-sm u-font-regular"
        >({{ itens.length }})</span
      >
    </h2>

    <ul class="u-flex u-flex-col u-gap-2">
      <SectionHorarioDapeSessaoMudancaItem
        v-for="item in itens"
        :key="item.mudancaId"
        :entrada="item"
        :modo="modo"
        :sessao-id="sessaoId"
        @desfeito="emit('desfeito')"
      />
    </ul>
  </section>
</template>

<style scoped>
.mudanca-group__title {
  color: var(--ladesa-text-default-color);
}

.mudanca-group__dot {
  width: 0.625rem;
  height: 0.625rem;
  background-color: var(--color);
}

.mudanca-group__count {
  color: var(--ladesa-grey-color);
}
</style>
