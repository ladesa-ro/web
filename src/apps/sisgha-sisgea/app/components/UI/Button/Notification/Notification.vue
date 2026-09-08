<script lang="ts" setup>
const open = ref(false);

const notificacoes = useNotificacoes();
const { data: contagemData } = notificacoes.contagemNaoLidas();
const { data: listaData, isLoading } = notificacoes.findAll();

const contagemNaoLidas = computed(() => contagemData.value?.count ?? 0);
const badgeText = computed(() =>
  contagemNaoLidas.value > 9 ? '9+' : String(contagemNaoLidas.value)
);

const notificacoesList = computed(() => listaData.value?.data ?? []);

function formatQuando(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

async function onClickNotificacao(id: string, lida: boolean) {
  if (!lida) {
    await notificacoes.marcarLida(id);
    await notificacoes.invalidate();
  }
}

async function onMarcarTodasLidas() {
  const idsNaoLidas = notificacoesList.value
    .filter(n => !n.lida)
    .map(n => n.id);
  if (idsNaoLidas.length === 0) return;
  await notificacoes.marcarTodasLidas(idsNaoLidas);
}
</script>

<template>
  <UIPopover v-model="open">
    <template #activator>
      <UIButtonDefaultSquare class="u-relative">
        <IconsNotifications class="notification-bell-icon" />

        <span
          v-if="contagemNaoLidas > 0"
          class="u-flex u-items-center u-justify-center u-px-1 u-rounded-full u-font-semibold notification-badge"
        >
          {{ badgeText }}
        </span>
      </UIButtonDefaultSquare>
    </template>

    <div
      class="u-flex u-flex-col u-rounded-lg u-overflow-hidden notification-panel"
    >
      <div
        class="u-flex u-items-center u-justify-between u-px-4 u-py-3 notification-panel__header"
      >
        <h2 class="u-font-semibold">Notificações</h2>
        <button
          v-if="contagemNaoLidas > 0"
          type="button"
          class="u-text-xs u-font-medium notification-panel__mark-all"
          @click="onMarcarTodasLidas"
        >
          Marcar todas como lidas
        </button>
      </div>

      <div class="u-flex-1 u-overflow-auto">
        <div
          v-if="isLoading"
          class="u-p-4 u-text-sm u-text-center notification-panel__empty"
        >
          Carregando...
        </div>

        <div
          v-else-if="notificacoesList.length === 0"
          class="u-p-4 u-text-sm u-text-center notification-panel__empty"
        >
          Nenhuma notificação por aqui.
        </div>

        <button
          v-for="notificacao in notificacoesList"
          :key="notificacao.id"
          type="button"
          class="u-w-full u-px-4 u-py-3 notification-item"
          :class="{ 'notification-item--unread': !notificacao.lida }"
          @click="onClickNotificacao(notificacao.id, notificacao.lida)"
        >
          <div class="u-flex u-items-start u-gap-2">
            <span
              v-if="!notificacao.lida"
              class="u-shrink-0 u-rounded-full notification-item__dot"
            />
            <div class="u-flex-1 notification-item__content">
              <p class="u-text-sm u-font-medium u-truncate">
                {{ notificacao.titulo }}
              </p>
              <p class="u-text-sm notification-item__body">
                {{ notificacao.conteudo }}
              </p>
              <p class="u-text-xs u-mt-1 notification-item__date">
                {{ formatQuando(notificacao.dateCreated) }}
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  </UIPopover>
</template>

<style scoped>
.notification-bell-icon {
  width: 80%;
  height: 80%;
}

.notification-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  min-width: 1.125rem;
  height: 1.125rem;
  background-color: var(--ladesa-red-color);
  color: var(--ladesa-white-color);
  font-size: 0.625rem;
  line-height: 1;
}

.notification-panel {
  width: 20rem;
  max-width: 90vw;
  max-height: 28rem;
  border: 2px solid var(--ladesa-grey-color);
  background-color: var(--ladesa-background-color);
}

.notification-panel__header {
  border-bottom: 1px solid rgb(from var(--ladesa-grey-color) R G B / 40%);
}

.notification-panel__mark-all {
  color: var(--ladesa-green-1-color);
}

.notification-panel__mark-all:hover {
  text-decoration: underline;
}

.notification-panel__empty {
  color: var(--ladesa-grey-color);
}

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
