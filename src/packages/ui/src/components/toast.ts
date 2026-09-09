export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastItem = {
  id: number | string;
  open: boolean;
  title: string;
  description?: string;
  type: ToastType;
  actionLabel?: string;
  onAction?: () => void;
};

export function closeToast(toast: ToastItem) {
  toast.open = false;
}
