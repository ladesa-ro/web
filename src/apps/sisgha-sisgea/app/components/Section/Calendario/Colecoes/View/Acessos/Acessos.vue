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
const acessoToRevoke = ref<CalendarioColecaoAcessoFindOneOutputDto | null>(null);

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
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="font-semibold text-lg">Acessos</h2>
      <SectionCalendarioColecoesViewAcessosGrantModal
        :colecao-id="colecaoId"
        @granted="acessosQuery.refetch()"
      />
    </div>

    <p v-if="acessos.length === 0" class="text-sm text-ldsa-grey">
      Nenhum acesso concedido além do dono.
    </p>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="border-b-2 border-ldsa-grey text-left text-ldsa-grey">
            <th class="py-2 pr-3 font-semibold">Escopo</th>
            <th class="py-2 pr-3 font-semibold">Alvo</th>
            <th class="py-2 pr-3 font-semibold">Papel</th>
            <th class="py-2 pr-3 font-semibold" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="acesso in acessos"
            :key="acesso.id"
            class="border-b border-ldsa-grey/40"
          >
            <td class="py-2 pr-3">{{ escopoLabel(acesso.escopo) }}</td>
            <td class="py-2 pr-3">{{ alvoLabel(acesso) }}</td>
            <td class="py-2 pr-3" :title="papelHint(acesso.papel)">
              {{ papelLabel(acesso.papel) }}
            </td>
            <td class="py-2 pr-3 text-right">
              <button
                type="button"
                class="text-ldsa-red font-medium hover:underline"
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
