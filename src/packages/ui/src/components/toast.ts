export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastItem = {
  id: number | string;
  open: any;
  title: string;
  description?: string;
  type: ToastType;
  actionLabel?: string;
  onAction?: () => void;
};
