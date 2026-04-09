<script setup lang="ts">
import type { CalendarioLetivoDiaFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { getDotColor, getDiaLabel, formatDateShort } from './-Helpers/format';

defineProps<{
  dia: CalendarioLetivoDiaFindOneOutputDto;
}>();

defineEmits<{
  edit: [dia: CalendarioLetivoDiaFindOneOutputDto];
}>();
</script>

<template>
  <div
    class="flex items-center justify-between border-b border-ldsa-grey/20 py-2.5 px-2 hover:bg-ldsa-grey/5"
  >
    <div class="flex items-center gap-2">
      <span
        class="inline-block size-2.5 rounded-full"
        :style="{ backgroundColor: getDotColor(dia) }"
      />
      <span class="text-sm font-medium text-ldsa-text-default">{{
        getDiaLabel(dia)
      }}</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs text-ldsa-grey">{{
        formatDateShort(dia.data)
      }}</span>
      <button
        class="p-1 rounded hover:bg-ldsa-grey/10 text-ldsa-grey hover:text-ldsa-green-1 transition-colors"
        title="Editar"
        @click="$emit('edit', dia)"
      >
        <IconsEdit class="size-4" />
      </button>
    </div>
  </div>
</template>
