import { reactive, ref, watch } from 'vue';

const defaultMessages = {
  cadastro: {
    success: 'Cadastro bem sucedido!',
    error: 'Ocorreu um erro ao efetuar o cadastro.',
    info: 'Informação sobre o cadastro.',
    warning: 'Atenção ao cadastrar.',
  },
  atualizacao: {
    success: 'Atualização bem sucedida!',
    error: 'Ocorreu um erro ao atualizar.',
    info: 'Informação sobre a atualização.',
    warning: 'Atenção ao atualizar.',
  },
  delete: {
    success: 'Exclusão realizada com sucesso!',
    error: 'Ocorreu um erro ao deletar.',
    info: 'Informação sobre exclusão.',
    warning: 'Atenção ao deletar.',
  },
};

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastOptions = {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number; // ms
  actionLabel?: string;
  onAction?: () => void;
};

export type ToastItem = {
  id: number;
  open: any;
  title: string;
  description?: string;
  type: ToastType;
  duration: number;
  actionLabel?: string;
  onAction?: () => void;
};

const toasts = reactive<ToastItem[]>([]);
let idCounter = 0;

function removeToastById(id: number) {
  const idx = toasts.findIndex(t => t.id === id);
  if (idx !== -1) toasts.splice(idx, 1);
}

export function useToast() {
  function push(opts: ToastOptions) {
    const id = ++idCounter;
    const toast: ToastItem = {
      id,
      open: ref(true),
      title: opts.title,
      description: opts.description,
      type: opts.type ?? 'info',
      duration: opts.duration ?? 4000,
      actionLabel: opts.actionLabel,
      onAction: opts.onAction,
    };

    toasts.push(toast);

    const timer = window.setTimeout(() => {
      toast.open.value = false;
    }, toast.duration);

    const stop = watch(
      () => toast.open.value,
      val => {
        if (!val) {
          window.clearTimeout(timer);
          setTimeout(() => {
            removeToastById(id);
            stop();
          }, 400);
        }
      }
    );

    return id;
  }

  function success(opts: Omit<ToastOptions, 'type'>) {
    return push({ ...opts, type: 'success' });
  }
  function error(opts: Omit<ToastOptions, 'type'>) {
    return push({ ...opts, type: 'error' });
  }
  function info(opts: Omit<ToastOptions, 'type'>) {
    return push({ ...opts, type: 'info' });
  }
  function warning(opts: Omit<ToastOptions, 'type'>) {
    return push({ ...opts, type: 'warning' });
  }

  // -------------------
  // showToast: função para mensagens padrão
  // -------------------
  type ToastActionType = keyof typeof defaultMessages;

  function showToast(
    action: ToastActionType,
    type: ToastType,
    customTitle?: string,
    customDescription?: string
  ) {
    const title = customTitle ?? defaultMessages[action][type];
    const description = customDescription;

    switch (type) {
      case 'success':
        return success({ title, description });
      case 'error':
        return error({ title, description });
      case 'info':
        return info({ title, description });
      case 'warning':
        return warning({ title, description });
    }
  }

  return {
    toasts,
    push,
    success,
    error,
    info,
    warning,
    removeToastById,
    showToast,
  };
}
