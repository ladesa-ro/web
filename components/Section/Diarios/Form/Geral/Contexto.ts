type IContextDiariosFormGeral = ReturnType<
  typeof createContextDiariosFormGeral
>;

export const createContextDiariosFormGeral = () => {
  const disciplinaId = ref<string | null>(null);

  return {
    disciplinaId,
  };
};

export const createAndProvideContextDiariosFormGeral = () => {
  const contexto = createContextDiariosFormGeral();
  provide('contexto-diarios-form-geral', contexto);
  return contexto;
};

export const useContextDiariosFormGeral = () => {
  const contexto = inject<IContextDiariosFormGeral>(
    'contexto-diarios-form-geral'
  );

  if (!contexto) {
    throw new Error(
      'Você precisa chamar o createAndProvideContextDiariosFormGeral em algum componente pai!'
    );
  }

  return contexto;
};
