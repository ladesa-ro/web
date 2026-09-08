<script lang="ts" setup>
import type { CalendarioColecaoAcessoFindOneOutputDto } from '@ladesa-ro/web.api.client';

const props = defineProps<{ colecaoId: string }>();

const colecoes = useCalendarioColecao();

const acessosQuery = colecoes.acessos.list(computed(() => props.colecaoId));
const acessos = computed(() => acessosQuery.data.value?.data ?? []);

const escopoLabel = (escopo: string) => {
  switch (escopo) {
    case 'CAMPUS':
      return 'Campus';
    case 'PUBLICO':
      return 'Público';
    default:
      return 'Usuário';
  }
};

const alvoLabel = (
  acesso: CalendarioColecaoAcessoFindOneOutputDto | null | undefined
) => {
  if (!acesso) return '';
  if (acesso.escopo === 'USUARIO') return acesso.usuario?.nome ?? '-';
  if (acesso.escopo === 'CAMPUS') return acesso.campus?.apelido ?? '-';
  return '';
};

const papelLabel = (papel: string) => {
  switch (papel) {
    case 'OCUPACAO':
      return 'Ocupação';
    case 'EDITOR':
      return 'Editor';
    default:
      return 'Leitor';
  }
};

const papelHint = (papel: string) => {
  switch (papel) {
    case 'OCUPACAO':
      return 'Vê só que o horário está ocupado';
    case 'EDITOR':
      return 'Edita a coleção e seus eventos';
    default:
      return 'Vê tudo, mas não edita';
  }
};

const confirmRevoke = useConfirmDelete();
const acessoToRevoke = ref<CalendarioColecaoAcessoFindOneOutputDto | null>(
  null
);

async function askRevoke(acesso: CalendarioColecaoAcessoFindOneOutputDto) {
  acessoToRevoke.value = acesso;
  const confirmed = await confirmRevoke.confirm();
  if (confirmed && acessoToRevoke.value) {
    await colecoes.acessos.revogar(props.colecaoId, acessoToRevoke.value.id);
    await acessosQuery.refetch();
  }
  acessoToRevoke.value = null;
}
</script>

<template>
  <div class="u-flex u-flex-col u-gap-4">
    <div class="u-flex u-justify-between u-items-center">
      <h2 class="u-font-semibold u-text-lg">Acessos</h2>
      <SectionCalendarioColecoesViewAcessosGrantModal
        :colecao-id="colecaoId"
        @granted="acessosQuery.refetch()"
      />
    </div>

    <p v-if="acessos.length === 0" class="acessos-empty u-text-sm">
      Nenhum acesso concedido além do dono.
    </p>

    <div v-else class="acessos-table-wrapper">
      <table class="acessos-table u-w-full u-text-sm">
        <thead>
          <tr class="acessos-table__head-row u-text-left">
            <th class="u-py-2 u-pr-3 u-font-semibold">Escopo</th>
            <th class="u-py-2 u-pr-3 u-font-semibold">Alvo</th>
            <th class="u-py-2 u-pr-3 u-font-semibold">Papel</th>
            <th class="u-py-2 u-pr-3 u-font-semibold" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="acesso in acessos"
            :key="acesso.id"
            class="acessos-table__row"
          >
            <td class="u-py-2 u-pr-3">{{ escopoLabel(acesso.escopo) }}</td>
            <td class="u-py-2 u-pr-3">{{ alvoLabel(acesso) }}</td>
            <td class="u-py-2 u-pr-3" :title="papelHint(acesso.papel)">
              {{ papelLabel(acesso.papel) }}
            </td>
            <td class="u-py-2 u-pr-3 u-text-right">
              <button
                type="button"
                class="acessos-revoke-button u-font-medium"
                @click="askRevoke(acesso)"
              >
                Revogar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <DialogConfirm
      v-model="confirmRevoke.isOpen.value"
      title="Revogar acesso"
      :message="`Revogar o acesso de ${alvoLabel(acessoToRevoke) || 'todos (público)'}?`"
      @confirm="confirmRevoke.onConfirm"
    />
  </div>
</template>

<style scoped>
.acessos-empty {
  color: var(--ladesa-grey-color);
}

.acessos-table-wrapper {
  overflow-x: auto;
}

.acessos-table {
  border-collapse: collapse;
}

.acessos-table__head-row {
  border-bottom: 2px solid var(--ladesa-grey-color);
  color: var(--ladesa-grey-color);
}

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
