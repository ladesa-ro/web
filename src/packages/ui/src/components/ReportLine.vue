<script lang="ts" setup>
export type ReportLineProps = {
  data: string;
  horario: string;
};

defineProps<ReportLineProps>();
</script>

<template>
  <div class="ui-report-line u-flex u-justify-between">
    <p>{{ data }}</p>
    <p>{{ horario }}</p>
  </div>
</template>
