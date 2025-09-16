import { reactive, ref, watch } from 'vue';

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

    // auto-close after duration
    const timer = window.setTimeout(() => {
      toast.open.value = false;
    }, toast.duration);

    const stop = watch(
      () => toast.open.value,
      (val) => {
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

  return {
    toasts,
    push,
    success,
    error,
    info,
    removeToastById,
  };
}
