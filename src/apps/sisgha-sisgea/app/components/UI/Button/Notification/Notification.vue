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
      <UIButtonDefaultSquare class="relative">
        <IconsIconNotifications class="w-[80%] h-[80%]" />

        <span
          v-if="contagemNaoLidas > 0"
          class="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.125rem] h-[1.125rem] px-1 rounded-full bg-ldsa-red text-white text-[0.625rem] font-semibold leading-none"
        >
          {{ badgeText }}
        </span>
      </UIButtonDefaultSquare>
    </template>

    <div
      class="w-80 max-w-[90vw] max-h-[28rem] flex flex-col rounded-lg border-2 border-ldsa-grey bg-ldsa-bg overflow-hidden"
    >
      <div class="flex items-center justify-between px-4 py-3 border-b border-ldsa-grey/40">
        <h2 class="font-semibold">Notificações</h2>
        <button
          v-if="contagemNaoLidas > 0"
          type="button"
          class="text-xs font-medium text-ldsa-green-1 hover:underline"
          @click="onMarcarTodasLidas"
        >
          Marcar todas como lidas
        </button>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div v-if="isLoading" class="p-4 text-sm text-ldsa-grey text-center">
          Carregando...
        </div>

        <div
          v-else-if="notificacoesList.length === 0"
          class="p-4 text-sm text-ldsa-grey text-center"
        >
          Nenhuma notificação por aqui.
        </div>

        <button
          v-for="notificacao in notificacoesList"
          :key="notificacao.id"
          type="button"
          class="w-full text-left px-4 py-3 border-b border-ldsa-grey/20 transition-colors hover:bg-ldsa-grey/10"
          :class="{ 'bg-ldsa-green-1/5': !notificacao.lida }"
          @click="onClickNotificacao(notificacao.id, notificacao.lida)"
        >
          <div class="flex items-start gap-2">
            <span
              v-if="!notificacao.lida"
              class="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-ldsa-green-1"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium truncate">{{ notificacao.titulo }}</p>
              <p class="text-sm text-ldsa-grey line-clamp-2">
                {{ notificacao.conteudo }}
              </p>
              <p class="text-xs text-ldsa-grey/70 mt-1">
                {{ formatQuando(notificacao.dateCreated) }}
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  </UIPopover>
</template>
