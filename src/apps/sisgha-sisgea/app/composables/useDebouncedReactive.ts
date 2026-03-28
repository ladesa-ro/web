import {
  type DebounceFilterOptions,
  toReactive,
  useDebounceFn,
} from '@vueuse/core';

export const useDebouncedReactive = <T>(
  reactiveState: T,
  ms?: globalThis.MaybeRefOrGetter<number> | undefined,
  options?: DebounceFilterOptions | undefined
) => {
  const getReactiveStateClone = () => ({ ...reactiveState });

  const debouncedReactiveStateRef = ref<T>(getReactiveStateClone()) as Ref<T>;

  const isDebouncePending = ref(false);

  const updateValue = () => {
    debouncedReactiveStateRef.value = getReactiveStateClone();
    isDebouncePending.value = false;
  };

  const handleSearchParamsUpdateDebounced = useDebounceFn(
    () => updateValue(),
    ms,
    options
  );

  const applyValue = () => {
    if (!isDebouncePending.value) {
      isDebouncePending.value = true;
      handleSearchParamsUpdateDebounced();
    }
  };

  watch([reactiveState], () => {
    applyValue();
  });

  const debouncedReactiveState = toReactive(debouncedReactiveStateRef) as T;

  return {
    reactiveState,
    //
    debouncedReactiveState,
    debouncedReactiveStateRef,
    //
    isDebouncePending,
  };
};
