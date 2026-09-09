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
    class="dia-list-item u-flex u-items-center u-justify-between u-py-2-5 u-px-2"
  >
    <div class="u-flex u-items-center u-gap-2">
      <span
        class="dia-list-item__dot u-rounded-full"
        :style="{ backgroundColor: getDotColor(dia) }"
      />
      <span class="dia-list-item__label u-text-sm u-font-medium">{{
        getDiaLabel(dia)
      }}</span>
    </div>
    <div class="u-flex u-items-center u-gap-2">
      <span class="dia-list-item__date u-text-xs">{{
        formatDateShort(dia.data)
      }}</span>
      <button
        class="dia-list-item__edit-btn u-p-1 u-rounded-sm"
        title="Editar"
        @click="$emit('edit', dia)"
      >
        <IconsEdit class="dia-list-item__edit-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.dia-list-item {
  border-bottom: 1px solid rgb(from var(--ladesa-grey-color) R G B / 20%);
}

.dia-list-item:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 5%);
}

.dia-list-item__dot {
  display: inline-block;
  width: 0.625rem;
  height: 0.625rem;
}

.dia-list-item__label {
  color: var(--ladesa-text-default-color);
}

.dia-list-item__date {
  color: var(--ladesa-grey-color);
}

.dia-list-item__edit-btn {
  color: var(--ladesa-grey-color);
  transition:
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    color var(--ui-duration-base) var(--ui-easing-standard);
}

.dia-list-item__edit-btn:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
  color: var(--ladesa-green-1-color);
}

.dia-list-item__edit-icon {
  width: 1rem;
  height: 1rem;
}
</style>
