<script setup lang="ts">
const open = defineModel<boolean>({ required: true, default: false });
</script>

<template>
  <UIPopover popover-arrow v-model="open">
    <template #activator>
      <slot />
    </template>

    <div class="bg-ldsa-bg border-ldsa-green-1 border-2 rounded-xl shadow-2xl">
      <!-- TODO: Fix Popover -->
      <!-- <SectionCalendarioMonth
        :year="dayjs().year()"
        :month="dayjs().month()"
        :events="[]"
        :steps="[]"
        :select-week="false"
        :toggle-month="false"
      /> -->
    </div>
  </UIPopover>
</template>
