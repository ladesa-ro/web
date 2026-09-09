<script lang="ts" setup>
defineProps<{ motivo: string; horario: string }>();

defineEmits<{ remove: [] }>();
</script>

<template>
  <li
    class="modal-cadastrar-motivo__pending-item u-flex u-justify-between u-items-center u-py-3"
  >
    <div class="u-flex u-justify-between u-w-full u-items-center">
      <span
        class="modal-cadastrar-motivo__pending-name u-font-semibold u-text-sm"
        >{{ motivo }}</span
      >

      <div class="u-flex u-items-center u-gap-2">
        <span
          class="modal-cadastrar-motivo__pending-time u-font-medium u-text-sm"
          >{{ horario }}</span
        >

        <button
          class="modal-cadastrar-motivo__delete-btn"
          aria-label="Excluir motivo"
          @click="$emit('remove')"
        >
          <IconsExclude class="modal-cadastrar-motivo__delete-icon" />
        </button>
      </div>
    </div>
  </li>
</template>

<style scoped>
.modal-cadastrar-motivo__pending-item {
  border-bottom: 1px solid var(--ladesa-grey-color);
}

.modal-cadastrar-motivo__pending-name {
  color: var(--ladesa-text-default-color);
}

.modal-cadastrar-motivo__pending-time {
  color: var(--ladesa-grey-color);
}

.modal-cadastrar-motivo__delete-btn {
  color: var(--ladesa-red-color);
}

.modal-cadastrar-motivo__delete-btn:hover {
  color: rgb(from var(--ladesa-red-color) R G B / 75%);
}

.modal-cadastrar-motivo__delete-icon {
  width: 0.75rem;
  height: 0.75rem;
}
</style>
