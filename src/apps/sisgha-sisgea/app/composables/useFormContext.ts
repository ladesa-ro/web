import type { FormMode } from '~/utils/constants';

export type FormContext = {
  isBusy: ComputedRef<boolean> | Ref<boolean>;
  mode?: ComputedRef<FormMode> | Ref<FormMode>;
  isLoading?: ComputedRef<boolean> | Ref<boolean>;
};

const FORM_CONTEXT_KEY = Symbol('form-context') as InjectionKey<FormContext>;

/**
 * Provides form context (isBusy, mode, isLoading) to descendant components.
 * Used by UIFormLayout automatically, or manually in forms without UIFormLayout.
 */
export function useProvideFormContext(context: FormContext) {
  provide(FORM_CONTEXT_KEY, context);
  return context;
}

/**
 * Injects form context if available. Returns undefined if no provider exists.
 * Used by VV components to auto-detect disabled state.
 */
export function useInjectFormContext(): FormContext | undefined {
  return inject(FORM_CONTEXT_KEY, undefined);
}

/**
 * Computes the effective disabled state for a form field.
 * Merges the explicit `disabled` prop with the context's `isBusy`.
 */
export function useFieldDisabled(propsDisabled: () => boolean | undefined): ComputedRef<boolean> {
  const context = useInjectFormContext();
  return computed(() => !!(propsDisabled() || context?.isBusy.value));
}
