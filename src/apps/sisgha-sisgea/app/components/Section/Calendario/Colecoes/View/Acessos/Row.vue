<script lang="ts" setup>
type Props = {
  escopo: string;
  alvo: string;
  papel: string;
  papelHint: string;
};

defineProps<Props>();

defineEmits<{ revoke: [] }>();
</script>

<template>
  <tr class="acessos-table__row">
    <td class="u-py-2 u-pr-3">{{ escopo }}</td>
    <td class="u-py-2 u-pr-3">{{ alvo }}</td>
    <td class="u-py-2 u-pr-3" :title="papelHint">{{ papel }}</td>
    <td class="u-py-2 u-pr-3 u-text-right">
      <button
        type="button"
        class="acessos-revoke-button u-font-medium"
        @click="$emit('revoke')"
      >
        Revogar
      </button>
    </td>
  </tr>
</template>

<style scoped>
.acessos-table__row {
  border-bottom: 1px solid rgb(from var(--ladesa-grey-color) R G B / 40%);
}

.acessos-revoke-button {
  color: var(--ladesa-red-color);
}

.acessos-revoke-button:hover {
  text-decoration: underline;
}
</style>
