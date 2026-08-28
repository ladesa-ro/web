<script lang="ts" setup>
import { createIdempotencyKey } from '~/composables/ladesa-api/-helpers/idempotencyKey';

type Props = { sessaoId: string };
const props = defineProps<Props>();

const router = useRouter();
const { success: toastSuccess, error: toastError } = useToast();
const horarioEdicao = useHorarioEdicao();

const sessaoIdRef = computed(() => props.sessaoId);
const {
  data: sessao,
  isLoading: isLoadingSessao,
  refetch: refetchSessao,
} = horarioEdicao.findOne(sessaoIdRef);
const {
  data: diferenca,
  isLoading,
  isError,
  refetch: refetchDiferenca,
} = horarioEdicao.diferenca(sessaoIdRef);

async function handleDesfeito() {
  await refetchDiferenca();
  await refetchSessao();
}

const estadoSessao = computed(
  () => (sessao.value?.status ?? 'ABERTA') as 'ABERTA' | 'SALVA' | 'CANCELADA'
);

const estadoLabel = computed(
  () =>
    ({
      ABERTA: 'Aberta',
      SALVA: 'Publicada',
      CANCELADA: 'Cancelada',
    })[estadoSessao.value]
);

const totalMudancas = computed(
  () =>
    (diferenca.value?.entram.length ?? 0) +
    (diferenca.value?.saem.length ?? 0) +
    (diferenca.value?.mudam.length ?? 0)
);

const semMudancasPendentes = computed(
  () => !isLoading.value && !isError.value && totalMudancas.value === 0
);

const publicarIdempotencyKey = createIdempotencyKey();

const confirmPublicar = useConfirmDelete();
const confirmCancelar = useConfirmDelete();

async function handlePublicar() {
  const confirmado = await confirmPublicar.confirm();
  if (!confirmado) return;

  try {
    await horarioEdicao.publicar(props.sessaoId, publicarIdempotencyKey);
    await refetchSessao();
    toastSuccess({ title: 'Mudanças publicadas no calendário oficial' });
    router.push('/sisgha/dape/horario');
  } catch {
    toastError({ title: 'Não foi possível publicar as mudanças' });
  }
}

async function handleCancelar() {
  const confirmado = await confirmCancelar.confirm();
  if (!confirmado) return;

  try {
    await horarioEdicao.cancelar(props.sessaoId);
    await refetchSessao();
    toastSuccess({ title: 'Sessão cancelada' });
    router.push('/sisgha/dape/horario');
  } catch {
    toastError({ title: 'Não foi possível cancelar a sessão' });
  }
}
</script>

<template>
  <UIContainer variant="larger">
    <UIBreadcrumbDapeBreadcrumb />

    <div class="flex flex-col gap-6 mt-4">
    <header class="flex flex-wrap items-center justify-between gap-2">
      <UITitle text="Revisão da sessão de edição" variant="small" />

      <span class="text-sm text-ldsa-grey">
        Sessão {{ sessaoId }} · {{ estadoLabel }}
      </span>
    </header>

    <UILoading v-if="isLoading" />

    <UIAlert
      v-else-if="isError"
      type="error"
      message="Não foi possível carregar as mudanças desta sessão."
    />

    <template v-else>
      <p
        v-if="semMudancasPendentes"
        class="text-ldsa-grey text-center py-10"
      >
        Nenhuma mudança pendente nesta sessão.
      </p>

      <div v-else class="flex flex-col gap-8">
        <SectionHorarioDapeSessaoMudancaGroup
          titulo="Entram"
          cor="green-2"
          modo="entram"
          :itens="diferenca?.entram ?? []"
          :sessao-id="sessaoId"
          @desfeito="handleDesfeito"
        />

        <SectionHorarioDapeSessaoMudancaGroup
          titulo="Saem"
          cor="red"
          modo="saem"
          :itens="diferenca?.saem ?? []"
          :sessao-id="sessaoId"
          @desfeito="handleDesfeito"
        />

        <SectionHorarioDapeSessaoMudancaGroup
          titulo="Mudam"
          cor="yellow"
          modo="mudam"
          :itens="diferenca?.mudam ?? []"
          :sessao-id="sessaoId"
          @desfeito="handleDesfeito"
        />
      </div>
    </template>

    <footer
      v-if="!isLoading && !isLoadingSessao && !isError && estadoSessao === 'ABERTA'"
      class="flex max-sm:flex-col gap-3 justify-between mt-4"
    >
      <UIButtonModalBaseLayout
        text="Cancelar sessão"
        color="var(--ladesa-red-color)"
        type="button"
        @click="handleCancelar"
      >
        <IconsClose />
      </UIButtonModalBaseLayout>

      <UIButtonModalBaseLayout
        text="Publicar"
        color="var(--ladesa-green-2-color)"
        type="button"
        :disabled="semMudancasPendentes"
        @click="handlePublicar"
      >
        <IconsConfirm />
      </UIButtonModalBaseLayout>
    </footer>
    </div>
  </UIContainer>

  <DialogConfirm
    v-model="confirmPublicar.isOpen.value"
    title="Publicar mudanças"
    :message="`Aplicar ${totalMudancas} mudanças ao calendário oficial?`"
    @confirm="confirmPublicar.onConfirm"
  />

  <DialogConfirm
    v-model="confirmCancelar.isOpen.value"
    title="Cancelar sessão"
    message="Esta ação descarta todas as mudanças propostas nesta sessão. Deseja continuar?"
    @confirm="confirmCancelar.onConfirm"
  />
</template>
