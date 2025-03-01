<script lang="ts" setup>
type Props = {
  variant: 'block' | 'inline';
};
const { variant } = defineProps<Props>();

const $emit = defineEmits(['edit']);
</script>

<template v-if="variant === 'block'">
  <!-- Layout do cartão "block" -->
  <div class="rounded-lg border-2 border-ldsa-grey overflow-hidden">
    <main class="p-2 pl-3">
      <!-- Ações -->
      <section class="flex justify-between items-center mb-1">
        <div class="shrink-0" @click.stop.prevent="() => {}">
          <slot name="actions" />
        </div>
      </section>

      <!-- Descrição -->
      <div class="flex flex-col text-sm font-medium">
        <slot />
      </div>
    </main>
  </div>
</template>
