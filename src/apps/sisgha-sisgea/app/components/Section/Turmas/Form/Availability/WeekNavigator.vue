<script lang="ts" setup>
defineProps<{
  weekLabel: string;
  hideButtons?: boolean;
}>();

defineEmits<{
  prev: [];
  next: [];
}>();
</script>

<template>
  <div class="flex items-center justify-between w-full gap-2">
    <UIButtonDefaultSquare
      v-if="!hideButtons"
      type="button"
      class="border-2 border-ldsa-grey !bg-transparent"
      @click="$emit('prev')"
    >
      <IconsArrow class="text-ldsa-green-1" />
    </UIButtonDefaultSquare>

    <span class="font-semibold text-ldsa-text-default text-center flex-1">
      {{ weekLabel }}
    </span>

    <UIButtonDefaultSquare
      v-if="!hideButtons"
      type="button"
      class="border-2 border-ldsa-grey !bg-transparent rotate-180"
      @click="$emit('next')"
    >
      <IconsArrow class="text-ldsa-green-1" />
    </UIButtonDefaultSquare>
  </div>
</template>
