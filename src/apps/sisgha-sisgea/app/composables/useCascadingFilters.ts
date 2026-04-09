import type { Ref } from 'vue';

type NullableRef = Ref<unknown> & { value: unknown };

export function useCascadingFilters(
  filters: {
    ref: Ref<unknown>;
    resetOnChange?: NullableRef[];
  }[]
) {
  for (const filter of filters) {
    if (filter.resetOnChange && filter.resetOnChange.length > 0) {
      const downstream = filter.resetOnChange;

      watch(
        () => filter.ref.value,
        () => {
          for (const target of downstream) {
            target.value = null;
          }
        }
      );
    }
  }
}
