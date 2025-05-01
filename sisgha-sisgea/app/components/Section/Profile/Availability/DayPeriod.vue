<script lang="ts" setup>
type Props = {
  period: Object[] | any;
  periodName: string;
};
defineProps<Props>();
</script>

<template>
  <div class="flex flex-col">
    <span class="periodName">
      {{ periodName }}
    </span>

    <SectionProfileAvailabilityHour
      v-for="hora in period"
      :end-hour="hora.endHour"
      :initial-hour="hora.initialHour"
    />
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app-reference.css";

.periodName {
  @apply pb-2.5 mb-2.5 border-b-[2px] border-b-ldsa-grey text-center;
}
</style>
