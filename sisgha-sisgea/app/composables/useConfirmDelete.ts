export interface IConfirmDeleteReturn {
  isOpen: Ref<boolean>;
  confirm: () => Promise<boolean>;
  onConfirm: () => void;
  onCancel: () => void;
}

export const useConfirmDelete = (): IConfirmDeleteReturn => {
  const isOpen = ref(false);
  const _resolve = ref<(v: boolean) => void>();

  const confirm = () =>
    new Promise<boolean>(resolve => {
      _resolve.value = resolve;
      isOpen.value = true;
    });

  const onConfirm = () => {
    _resolve.value?.(true);
    isOpen.value = false;
  };

  const onCancel = () => {
    _resolve.value?.(false);
    isOpen.value = false;
  };

  return { isOpen, confirm, onConfirm, onCancel };
};
