import type { ComputedRef, InjectionKey, Ref } from 'vue';
import { computed, inject, provide } from 'vue';

export type FormContext<Mode = unknown> = {
  isBusy: ComputedRef<boolean> | Ref<boolean>;
  mode?: ComputedRef<Mode> | Ref<Mode>;
  isLoading?: ComputedRef<boolean> | Ref<boolean>;
};

const FormContextKey = Symbol('ui-form-context') as InjectionKey<FormContext>;

export function useProvideFormContext<Mode>(context: FormContext<Mode>) {
  provide(FormContextKey, context as FormContext);
  return context;
}

export function useInjectFormContext(): FormContext | undefined {
  return inject(FormContextKey, undefined);
}

export function useFieldDisabled(
  propsDisabled: () => boolean | undefined
): ComputedRef<boolean> {
  const context = useInjectFormContext();
  return computed(() => !!(propsDisabled() || context?.isBusy.value));
}
