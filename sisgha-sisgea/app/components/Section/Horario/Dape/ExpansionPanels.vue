<script lang="ts" setup>
import { CollapsibleContent, CollapsibleRoot } from 'reka-ui';

type Props = { title: string };
defineProps<Props>();

//

const open = ref(false);
</script>

<template>
  <CollapsibleRoot v-model:open="open" class="collapsible-root">
    <div class="collapsible-header" @click="open = !open">
      <h1>{{ title }}</h1>
      <span class="text-ldsa-white/60">Editado há 3 horas</span>
    </div>

    <CollapsibleContent class="collapsible-content collapsible-animation">
      <section class="mx-auto w-max px-6 py-3">
        <main class="w-full overflow-x-auto">
          <slot />
        </main>
      </section>
    </CollapsibleContent>

    <div class="collapsible-footer" @click="open = !open">
      <IconsArrowIconArrow
        :class="open ? 'rotate-90' : '-rotate-90'"
        class="text-ldsa-green-1"
      />
    </div>
  </CollapsibleRoot>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.collapsible-root {
  @apply overflow-hidden w-full border-2 border-ldsa-grey rounded-lg text-ldsa-white text-[0.938rem];
}

.collapsible-header {
  @apply flex flex-col gap-4 w-full px-6 py-3 bg-ldsa-green-1 text-left cursor-pointer;
}

.collapsible-content {
  @apply overflow-x-auto overflow-y-hidden;
}

.collapsible-footer {
  @apply flex justify-center items-center h-12 cursor-pointer;
}

/* Collapsible animation */

.collapsible-animation[data-state='open'] {
  @apply animate-[slideDown_0.21s_ease-in];
}

.collapsible-animation[data-state='closed'] {
  @apply animate-[slideUp_0.21s_ease-out];
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--reka-collapsible-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--reka-collapsible-content-height);
  }
  to {
    height: 0;
  }
}
</style>
