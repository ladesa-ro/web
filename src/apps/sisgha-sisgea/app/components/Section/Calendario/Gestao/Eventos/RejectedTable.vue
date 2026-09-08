<script lang="ts" setup>
type Rejected = { index: number; uid?: string | null; motivo: string };

defineProps<{ rejeitados: Rejected[] }>();
</script>

<template>
  <div class="import-ics__rejected-table-wrap u-overflow-auto u-rounded-lg">
    <table class="u-w-full u-text-sm">
      <thead class="import-ics__table-head">
        <tr>
          <th class="u-text-left u-p-2">#</th>
          <th class="u-text-left u-p-2">UID</th>
          <th class="u-text-left u-p-2">Motivo</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="rejeitado in rejeitados"
          :key="rejeitado.index"
          class="import-ics__table-row"
        >
          <td class="u-p-2">{{ rejeitado.index }}</td>
          <td class="import-ics__table-uid u-p-2 u-truncate">
            {{ rejeitado.uid ?? '—' }}
          </td>
          <td class="u-p-2">{{ rejeitado.motivo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.import-ics__rejected-table-wrap {
  border: 1px solid rgb(from var(--ladesa-grey-color) R G B / 40%);
  max-height: 13rem;
}

.import-ics__table-head {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.import-ics__table-row {
  border-top: 1px solid rgb(from var(--ladesa-grey-color) R G B / 20%);
}

.import-ics__table-uid {
  max-width: 8rem;
}
</style>
