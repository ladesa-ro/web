<script lang="ts" setup>
type Props = {
  titulo: string;
  conteudo: string;
  dateCreated: string;
  lida: boolean;
};

const props = defineProps<Props>();

defineEmits<{ click: [] }>();

const quando = computed(() => {
  const date = new Date(props.dateCreated);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
});
</script>

<template>
  <button
    type="button"
    class="u-w-full u-px-4 u-py-3 notification-item"
    :class="{ 'notification-item--unread': !lida }"
    @click="$emit('click')"
  >
    <div class="u-flex u-items-start u-gap-2">
      <span
        v-if="!lida"
        class="u-shrink-0 u-rounded-full notification-item__dot"
      />
      <div class="u-flex-1 notification-item__content">
        <p class="u-text-sm u-font-medium u-truncate">{{ titulo }}</p>
        <p class="u-text-sm notification-item__body">{{ conteudo }}</p>
        <p class="u-text-xs u-mt-1 notification-item__date">{{ quando }}</p>
      </div>
    </div>
  </button>
</template>

<style scoped>
.notification-item {
  display: block;
  text-align: left;
  border-bottom: 1px solid rgb(from var(--ladesa-grey-color) R G B / 20%);
  transition: background-color var(--ui-duration-fast) var(--ui-easing-standard);
}

.notification-item:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.notification-item--unread {
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 5%);
}

.notification-item__dot {
  margin-top: 0.375rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--ladesa-green-1-color);
}

.notification-item__content {
  min-width: 0;
}

.notification-item__body {
  color: var(--ladesa-grey-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notification-item__date {
  color: rgb(from var(--ladesa-grey-color) R G B / 70%);
}
</style>
