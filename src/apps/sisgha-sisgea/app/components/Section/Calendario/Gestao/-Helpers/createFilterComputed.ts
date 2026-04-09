type FilterOption = { label: string; value: string };

export function createFilterComputed<K extends string>(
  store: { [P in K]: string | null },
  key: K,
  options: FilterOption[]
): WritableComputedRef<FilterOption | undefined> {
  return computed({
    get: () => {
      const val = store[key];
      return val
        ? (options.find(o => o.value === val) ?? undefined)
        : undefined;
    },
    set: (opt: FilterOption | undefined) => {
      store[key] = (opt?.value ?? null) as (typeof store)[K];
    },
  });
}
