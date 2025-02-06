export const CRUD_FORM_QUERY_CONTEXT = Symbol();

export type ICrudFormQueryContext = {
  editId: ComputedRef<string | null>;

  isBusy: globalThis.ComputedRef<boolean>;
  isLoading: globalThis.ComputedRef<boolean>;

  formOnSubmit: (e?: Event) => Promise<void> | undefined;
};
