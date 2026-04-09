export interface IModalConfig {
  exclusive?: boolean;
}

export interface IModalManagerOptions<T extends string> {
  initial?: T | null;
  history?: boolean;
  modals?: Partial<Record<T, IModalConfig>>;
}

export interface IModalManagerReturn<T extends string> {
  activeModals: Readonly<Ref<ReadonlySet<T>>>;
  activeModal: ComputedRef<T | null>;
  stack: Readonly<Ref<readonly T[]>>;
  open: (name: T) => void;
  close: (name?: string) => void;
  closeAll: () => void;
  isActive: (name: string) => boolean;
  hasActiveModal: ComputedRef<boolean>;
}

export function useModalManager<T extends string>(
  options?: IModalManagerOptions<T>
): IModalManagerReturn<T> {
  const {
    initial = null,
    history = false,
    modals: modalConfigs = {},
  } = options ?? {};

  const activeModals = ref<Set<T>>(new Set(initial ? [initial] : [])) as Ref<
    Set<T>
  >;
  const stack = ref<T[]>([]) as Ref<T[]>;
  const lastExclusive = ref<T | null>(
    initial && isExclusiveFn(initial) ? initial : null
  ) as Ref<T | null>;

  function isExclusiveFn(name: T): boolean {
    const config = (modalConfigs as Partial<Record<T, IModalConfig>>)[name];
    return config?.exclusive !== false;
  }

  const activeModal = computed<T | null>(() => lastExclusive.value);

  const hasActiveModal = computed(() => activeModals.value.size > 0);

  function open(name: T) {
    const next = new Set(activeModals.value);

    if (isExclusiveFn(name)) {
      if (history && lastExclusive.value !== null) {
        stack.value = [...stack.value, lastExclusive.value];
      }

      for (const active of activeModals.value) {
        if (isExclusiveFn(active)) {
          next.delete(active);
        }
      }

      lastExclusive.value = name;
    }

    next.add(name);
    activeModals.value = next;
  }

  function close(name?: string) {
    if (name !== undefined) {
      const next = new Set(activeModals.value);

      if (next.delete(name as T)) {
        if (lastExclusive.value === name) {
          lastExclusive.value = null;
        }

        activeModals.value = next;
      }

      return;
    }

    if (history && stack.value.length > 0) {
      const prev = stack.value[stack.value.length - 1]!;
      stack.value = stack.value.slice(0, -1);

      const next = new Set(activeModals.value);

      if (lastExclusive.value !== null) {
        next.delete(lastExclusive.value);
      }

      next.add(prev);
      lastExclusive.value = prev;
      activeModals.value = next;
    } else if (lastExclusive.value !== null) {
      const next = new Set(activeModals.value);
      next.delete(lastExclusive.value);
      lastExclusive.value = null;
      activeModals.value = next;
    }
  }

  function closeAll() {
    stack.value = [];
    lastExclusive.value = null;
    activeModals.value = new Set();
  }

  function isActive(name: string): boolean {
    return activeModals.value.has(name as T);
  }

  return {
    activeModals: readonly(activeModals) as Readonly<Ref<ReadonlySet<T>>>,
    activeModal,
    stack: readonly(stack) as Readonly<Ref<readonly T[]>>,
    open,
    close,
    closeAll,
    isActive,
    hasActiveModal,
  };
}
