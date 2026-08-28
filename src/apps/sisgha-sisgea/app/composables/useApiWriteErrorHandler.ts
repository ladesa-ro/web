import { ref } from 'vue';
import { ApiError } from '@ladesa-ro/web.api.client';

export type UseApiWriteErrorHandlerOptions = {
  onForbidden?: () => Promise<void> | void;
  onNotFound?: () => Promise<void> | void;
  onReload?: () => Promise<void> | void;
};

export function useApiWriteErrorHandler(
  options: UseApiWriteErrorHandlerOptions = {}
) {
  const { error: toastError } = useToast();

  const conflictMessage = ref<string | null>(null);

  function clearConflictMessage() {
    conflictMessage.value = null;
  }

  async function handle(err: unknown): Promise<boolean> {
    if (!(err instanceof ApiError)) {
      return false;
    }

    switch (err.status) {
      case 403:
        toastError({ title: 'Sem permissão de edição nesta coleção' });
        await options.onForbidden?.();
        return true;

      case 404:
        toastError({ title: 'Registro não encontrado' });
        await options.onNotFound?.();
        return true;

      case 412:
        toastError({
          title:
            'Este evento foi alterado por outra pessoa. Recarregue antes de salvar de novo',
          duration: 15000,
          actionLabel: 'Recarregar',
          onAction: () => {
            void options.onReload?.();
          },
        });
        return true;

      case 400:
        conflictMessage.value = err.message;
        return true;

      default:
        return false;
    }
  }

  return { handle, conflictMessage, clearConflictMessage };
}
