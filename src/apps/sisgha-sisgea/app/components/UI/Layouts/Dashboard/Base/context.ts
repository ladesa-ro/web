type ILayoutsDashboardContext = ReturnType<
  typeof createLayoutsDashboardContext
>;

const token = Symbol();

export const useLayoutsDashboardContext = (): ILayoutsDashboardContext => {
  const injected = inject<ILayoutsDashboardContext>(token);

  if (!injected) {
    throw new Error('LayoutsDashboardContext not created');
  }

  return injected;
};

export const createLayoutsDashboardContext = () => {
  const hamburguerActive = ref(false);
  return { hamburguerActive };
};

export const provideLayoutsDashboardContext = () => {
  const context = createLayoutsDashboardContext();

  provide(token, context);

  return context;
};
